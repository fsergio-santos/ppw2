import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tratarErroBanco } from '../../commons/banco/error.database';
import { EntityRegisteredExcepiton } from '../../commons/exceptions/error/entity.cadastrada.exception';
import { MATRICULA } from '../constants/alunodisciplina.constants';
import { ConverterMatricula } from '../dto/converter/aluno.disciplina.converter';
import { MatriculaRequest } from '../dto/request/aluno.disciplina.request';
import { MatriculaResponse } from '../dto/response/aluno.disciplina.response';
import { Matricula } from '../entity/aluno.disciplina.entity';
import { MatriculaServiceFindOne } from './matricula.service.findone';

@Injectable()
export class MatriculaServiceCreate {
  constructor(
    @InjectRepository(Matricula)
    private matriculaRepository: Repository<Matricula>,
    private matriculaServiceFindOne: MatriculaServiceFindOne,
  ) {}

  async create(matriculaRequest: MatriculaRequest): Promise<MatriculaResponse> {
    try {
      let matricula = ConverterMatricula.toMatricula(matriculaRequest);

      const matriculaCadastrada = await this.matriculaServiceFindOne.findById(
        matricula.alunoId,
        matricula.disciplinaId,
      );

      if (matriculaCadastrada) {
        throw new EntityRegisteredExcepiton(MATRICULA.OPERACAO.CRIAR.EXISTE);
      }

      matricula = await this.matriculaRepository.save(matricula);

      return ConverterMatricula.toMatriculaResponse(matricula);
    } catch (error: any) {
      tratarErroBanco(error, undefined, MATRICULA.ENTITY);
    }
  }
}
