import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Repository } from 'typeorm';
import { tratarErroBanco } from '../../commons/banco/error.database';
import { CIDADE } from '../constants/cidade.constants';
import { ConverterCidade } from '../dto/converter/cidade.converter';
import { CidadeResponse } from '../dto/response/cidade.response';
import { Cidade } from '../entities/cidade.entity';

@Injectable()
export class CidadeServiceFindOne {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
  ) {}

  async findOne(idCidade: number): Promise<CidadeResponse | null> {
    const cidadeExistente = await this.findById(idCidade);
    if (!cidadeExistente) {
      throw new EntityNotFoundException(`${CIDADE.OPERACAO.POR_ID.NAO_LOCALIZADO} - ${idCidade}`);
    }
    return ConverterCidade.toCidadeResponse(cidadeExistente);
  }

  async findById(idCidade: number): Promise<Cidade | null> {
    try {
      const cidade = await this.cidadeRepository
        .createQueryBuilder(CIDADE.ALIAS)
        .where(`${CIDADE.ALIAS}.${CIDADE.FIELDS.ID}= :idCidade`, { idCidade: idCidade })
        .getOne();

      return cidade;
    } catch (error: any) {
      tratarErroBanco(error, idCidade, CIDADE.ENTITY);
    }
  }
}
