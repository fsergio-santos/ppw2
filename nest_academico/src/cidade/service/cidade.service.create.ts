import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tratarErroBanco } from '../../commons/banco/error.database';
import { EntityRegisteredExcepiton } from '../../commons/exceptions/error/entity.cadastrada.exception';
import { CIDADE } from '../constants/cidade.constants';
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
        .createQueryBuilder(CIDADE.ALIAS)
        .where(`${CIDADE.ALIAS}.${CIDADE.FIELDS.NOME} = :nome`, { nome: cidade.nomeCidade })
        .getOne();

      if (cidadeCastrada) {
        throw new EntityRegisteredExcepiton(CIDADE.OPERACAO.CRIAR.EXISTE);
      }

      cidade = await this.cidadeRepository.save(cidade);

      return ConverterCidade.toCidadeResponse(cidade);
    } catch (error: any) {
      tratarErroBanco(error, undefined, CIDADE.ENTITY);
    }
  }
}
