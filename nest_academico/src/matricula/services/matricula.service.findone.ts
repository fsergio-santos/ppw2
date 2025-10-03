import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Repository } from 'typeorm';
import { ALUNO } from '../../aluno/constants/aluno.constants';
import { tratarErroBanco } from '../../commons/banco/error.database';
import { DISCIPLINA } from '../../disciplina/constants/disciplina.constants';
import { MATRICULA } from '../constants/alunodisciplina.constants';
import { ConverterMatricula } from '../dto/converter/aluno.disciplina.converter';
import { MatriculaResponse } from '../dto/response/aluno.disciplina.response';
import { Matricula } from '../entity/aluno.disciplina.entity';

@Injectable()
export class MatriculaServiceFindOne {
  constructor(
    @InjectRepository(Matricula)
    private matriculaRepository: Repository<Matricula>,
  ) {}

  async findOne(idAluno: number, idDisciplina: number): Promise<MatriculaResponse | null> {
    const matriculaExistente = await this.findById(idAluno, idDisciplina);
    if (!matriculaExistente) {
      throw new EntityNotFoundException(`${MATRICULA.OPERACAO.POR_ID.NAO_LOCALIZADO} - ${idAluno} - ${idDisciplina}`);
    }
    return ConverterMatricula.toMatriculaResponse(matriculaExistente);
  }

  async findById(idAluno?: number, idDisciplina?: number): Promise<Matricula | null> {
    try {
      const matricula = await this.matriculaRepository
        .createQueryBuilder(MATRICULA.ALIAS)
        .where(`${MATRICULA.ALIAS}.${MATRICULA.FIELDS.ALUNO_ID} = :alunoId`, { alunoId: idAluno })
        .andWhere(`${MATRICULA.ALIAS}.${MATRICULA.FIELDS.DISCIPLINA_ID} = :disciplinaId`, {
          disciplinaId: idDisciplina,
        })
        .leftJoinAndSelect(MATRICULA.TO_ALUNO, ALUNO.ALIAS)
        .leftJoinAndSelect(MATRICULA.TO_DISCIPLINA, DISCIPLINA.ALIAS)
        .getOne();

      return matricula;
    } catch (error: any) {
      tratarErroBanco(error, undefined, MATRICULA.ENTITY);
    }
  }
}
