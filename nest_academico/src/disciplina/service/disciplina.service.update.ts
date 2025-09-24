import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Repository } from 'typeorm';
import { DISCIPLINA } from '../constants/disciplina.constants';
import { ConverterDisciplina } from '../dto/converter/disciplina.converter';
import { DisciplinaRequest } from '../dto/request/disciplina.request';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { Disciplina } from '../entities/disciplina.entity';
import { DisciplinaServiceFindOne } from './disciplina.service.findone';

@Injectable()
export class DisciplinaServiceUpdate {
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,
    private findOne: DisciplinaServiceFindOne,
  ) {}

  async updatePut(idDisciplina: number, disciplinaRequest: DisciplinaRequest): Promise<DisciplinaResponse> {
    try {
      const disciplinaExistente = await this.findOne.findById(idDisciplina);

      if (!disciplinaExistente) {
        throw new EntityNotFoundException(`${DISCIPLINA.OPERACAO.POR_ID.NAO_LOCALIZADO} - ${idDisciplina}`);
      }

      let disciplina = ConverterDisciplina.toDisciplina(disciplinaRequest);

      const disciplinaAtualizada = Object.assign(disciplinaExistente, disciplina);

      disciplina = await this.disciplinaRepository.save(disciplinaAtualizada);
      return ConverterDisciplina.toDisciplinaResponse(disciplinaAtualizada);
    } catch (error: any) {
      tratarErroBanco(error, idDisciplina, DISCIPLINA.ENTITY);
    }
  }
}
