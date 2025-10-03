import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Repository } from 'typeorm';
import { ALUNO } from '../../aluno/constants/aluno.constants';
import { DISCIPLINA } from '../../disciplina/constants/disciplina.constants';
import { MATRICULA } from '../constants/alunodisciplina.constants';
import { Matricula } from '../entity/aluno.disciplina.entity';
import { MatriculaServiceFindOne } from './matricula.service.findone';

@Injectable()
export class MatriculaServiceRemove {
  constructor(
    @InjectRepository(Matricula)
    private matriculaRepository: Repository<Matricula>,
    private findOne: MatriculaServiceFindOne,
  ) {}

  async remove(idAluno: number, idDisciplina: number): Promise<void> {
    const matricula = await this.findOne.findById(idAluno, idDisciplina);
    if (!matricula) {
      throw new EntityNotFoundException(
        `${MATRICULA.OPERACAO.POR_ID.NAO_LOCALIZADO} - ${ALUNO.ENTITY}: ${idAluno}, ${DISCIPLINA.ENTITY}: ${idDisciplina}.`,
      );
    }
    try {
      const result = await this.matriculaRepository
        .createQueryBuilder()
        .delete()
        .from(MATRICULA.ALIAS)
        .where(`${MATRICULA.ALIAS}.${MATRICULA.FIELDS.ALUNO_ID} = :alunoId`, { alunoId: idAluno })
        .andWhere(`${MATRICULA.ALIAS}.${MATRICULA.FIELDS.DISCIPLINA_ID} = :disciplinaId`, {
          disciplinaId: idDisciplina,
        })
        .execute();
      if (result.affected === 0) {
        throw new EntityNotFoundException(
          `${MATRICULA.OPERACAO.POR_ID.NAO_LOCALIZADO} ${ALUNO.ENTITY}: ${idAluno}, ${DISCIPLINA.ENTITY}: ${idDisciplina}.`,
        );
      }
    } catch (error: any) {
      tratarErroBanco(error, undefined, MATRICULA.ENTITY);
    }
  }
}
