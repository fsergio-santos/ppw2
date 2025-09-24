import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Repository } from 'typeorm';
import { Cidade } from '../entities/cidade.entity';
import { CidadeServiceFindOne } from './cidade.service.findone';
import { CIDADE } from '../constants/cidade.constants';

@Injectable()
export class CidadeServiceRemove {
  constructor(
    @InjectRepository(Cidade)
    private cidadeRepository: Repository<Cidade>,
    private findOne: CidadeServiceFindOne,
  ) {}

  async remove(idCidade: number): Promise<void> {
    const cidade = await this.findOne.findById(idCidade);
    if (!cidade?.idCidade) {
      throw new EntityNotFoundException(`${CIDADE.OPERACAO.POR_ID.NAO_LOCALIZADO} - ${idCidade}.`);
    }
    try {
      await this.cidadeRepository
        .createQueryBuilder(CIDADE.ALIAS)
        .delete()
        .from(CIDADE.ENTITY)
        .where(`${CIDADE.ALIAS}.${CIDADE.FIELDS.ID} = :idCidade`, { idCidade: idCidade })
        .execute();
    } catch (error: any) {
      tratarErroBanco(error, idCidade, CIDADE.ENTITY);
    }
  }
}
