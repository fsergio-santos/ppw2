import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Repository } from 'typeorm';
import { DISCIPLINA } from '../constants/disciplina.constants';
import { Disciplina } from '../entities/disciplina.entity';
import { DisciplinaServiceFindOne } from './disciplina.service.findone';

@Injectable()
export class DisciplinaServiceRemove {
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,
    private findOne: DisciplinaServiceFindOne,
  ) {}

  async remove(idDisciplina: number): Promise<void> {
    const disciplina = await this.findOne.findById(idDisciplina);
    if (!disciplina?.idDisciplina) {
      throw new EntityNotFoundException(`${DISCIPLINA.OPERACAO.POR_ID.NAO_LOCALIZADO} - ${idDisciplina}.`);
    }
    try {
      await this.disciplinaRepository
        .createQueryBuilder(DISCIPLINA.ALIAS)
        .delete()
        .from(DISCIPLINA.ENTITY)
        .where(`${DISCIPLINA.ALIAS}.${DISCIPLINA.FIELDS.ID} = :idDisciplina`, { idDisciplina: idDisciplina })
        .execute();
    } catch (error: any) {
      tratarErroBanco(error);
    }
  }
}
