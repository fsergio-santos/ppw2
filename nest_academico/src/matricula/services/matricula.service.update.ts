import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Repository } from 'typeorm';

import { MATRICULA } from '../constants/alunodisciplina.constants';
import { ConverterMatricula } from '../dto/converter/aluno.disciplina.converter';
import { MatriculaRequest } from '../dto/request/aluno.disciplina.request';
import { MatriculaResponse } from '../dto/response/aluno.disciplina.response';
import { Matricula } from '../entity/aluno.disciplina.entity';
import { MatriculaServiceFindOne } from './matricula.service.findone';

@Injectable()
export class MatriculaServiceUpdate {
  constructor(
    @InjectRepository(Matricula)
    private matriculaRepository: Repository<Matricula>,
    private findOne: MatriculaServiceFindOne,
  ) {}

  async updatePut(matriculaRequest: MatriculaRequest): Promise<MatriculaResponse> {
    let matricula = ConverterMatricula.toMatricula(matriculaRequest);
    const matriculaExistente = await this.findOne.findById(matricula.alunoId, matricula.disciplinaId);

    if (!matriculaExistente) {
      throw new EntityNotFoundException(`${MATRICULA.OPERACAO.POR_ID.NAO_LOCALIZADO} `);
    }

    const matriculaAtualizada = Object.assign(matriculaExistente, matricula);

    try {
      matricula = await this.matriculaRepository.save(matriculaAtualizada);
      return ConverterMatricula.toMatriculaResponse(matriculaAtualizada);
    } catch (error: any) {
      tratarErroBanco(error, undefined, MATRICULA.ENTITY);
    }
  }
}
