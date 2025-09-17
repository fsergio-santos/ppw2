import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { CidadeServiceFindOne } from './cidade.service.findone';
import { Cidade } from '../entities/cidade.entity';
import { CidadeRequest } from '../dto/request/cidade.request';
import { CidadeResponse } from '../dto/response/cidade.response';
import { ConverterCidade } from '../dto/converter/cidade.converter';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EntityRegisteredExcepiton } from '../../commons/exceptions/error/entity.cadastrada.exception';

@Injectable()
export class CidadeServiceUpdate {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
    private findOne: CidadeServiceFindOne,
  ) {}

  async updatePut(idCidade: number, cidadeRequest: CidadeRequest): Promise<CidadeResponse> {
    const cidadeExistente = await this.findOne.findById(idCidade);

    if (!cidadeExistente) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${idCidade}`);
    }

    let cidade = ConverterCidade.toCidade(cidadeRequest);

    const cidadeAtualizada = Object.assign(cidadeExistente, cidade);

    try {
      cidade = await this.cidadeRepository.save(cidadeAtualizada);
      return ConverterCidade.toCidadeResponse(cidadeAtualizada);
    } catch (error: any) {
      if (
      error.code === 'ORA-00001' ||  // Oracle
      error.code === '23505' ||      // Postgres
      error.code === 'ER_DUP_ENTRY' || error.errno === 1062 // MySQL/MariaDB
    ) {
      throw new EntityRegisteredExcepiton(MENSAGENS_GENERICAS.ENTIDADE_JA_CADASTRADA);
    }
      tratarErroBanco(error);
    }
  }
}
