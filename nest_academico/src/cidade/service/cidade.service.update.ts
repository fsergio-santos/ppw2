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
import { CIDADE } from '../constants/cidade.constants';

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
      throw new EntityNotFoundException(`${CIDADE.OPERACAO.POR_ID.NAO_LOCALIZADO} - ${idCidade}`);
    }

    let cidade = ConverterCidade.toCidade(cidadeRequest);

    const cidadeAtualizada = Object.assign(cidadeExistente, cidade);

    try {
      cidade = await this.cidadeRepository.save(cidadeAtualizada);
      return ConverterCidade.toCidadeResponse(cidadeAtualizada);
    } catch (error: any) {
      tratarErroBanco(error, idCidade, CIDADE.ENTITY);
    }
  }
}
