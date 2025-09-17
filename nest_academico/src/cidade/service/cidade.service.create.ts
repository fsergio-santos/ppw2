import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tratarErroBanco } from '../../commons/banco/error.database';
import { MENSAGENS_GENERICAS } from '../../commons/enum/mensagem.generica.enum';
import { EntityRegisteredExcepiton } from '../../commons/exceptions/error/entity.cadastrada.exception';
import { ConverterCidade } from '../dto/converter/cidade.converter';
import { CidadeRequest } from '../dto/request/cidade.request';
import { CidadeResponse } from '../dto/response/cidade.response';
import { Cidade } from '../entities/cidade.entity';

@Injectable()
export class CidadeServiceCreate {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
  ) {}

  async create(cidadeRequest: CidadeRequest): Promise<CidadeResponse> {
    try {
      let cidade = ConverterCidade.toCidade(cidadeRequest);

      const cidadeCastrada = await this.cidadeRepository
        .createQueryBuilder('cidade')
        .where('cidade.nomeCidade = :nome', { nome: cidade.nomeCidade })
        .getOne();

      if (cidadeCastrada) {
        throw new EntityRegisteredExcepiton(MENSAGENS_GENERICAS.ENTIDADE_JA_CADASTRADA);
      }

      cidade = await this.cidadeRepository.save(cidade);

      return ConverterCidade.toCidadeResponse(cidade);
    } catch (error: any) {
      if (
        error.code === 'ORA-00001' || //oracle
        error.code === '23505' || //postgree
        error.code === 'ER_DUP_ENTRY' || // mysql
        error.errno === 1062
      ) {
        throw new EntityRegisteredExcepiton(MENSAGENS_GENERICAS.ENTIDADE_JA_CADASTRADA);
      }

      tratarErroBanco(error);
    }
  }
}
