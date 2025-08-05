import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { Repository } from 'typeorm';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { ConverterProfessor } from '../dto/converter/professor.converter';
import { Professor } from '../entities/professor.entity';
import { ProfessorServiceFindOne } from './professor.service.findone';
import { ProfessorRequest } from '../dto/request/professor.request';
import { ProfessorResponse } from '../dto/response/professor.response';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';

@Injectable()
export class ProfessorServiceUpdate {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
    private findOne: ProfessorServiceFindOne,
  ) {}

  async updatePut(idProfessor: number, professorRequest: ProfessorRequest): Promise<ProfessorResponse> {
    const professorExistente = await this.findOne.findById(idProfessor);

    if (!professorExistente) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${idProfessor}`);
    }

    let professor = ConverterProfessor.toProfessor(professorRequest);

    const professorAtualizado = Object.assign(professorExistente, professor);

    try {
      professor = await this.professorRepository.save(professorAtualizado);
      return ConverterProfessor.toProfessorResponse(professorAtualizado);
    } catch (error: any) {
      tratarErroBanco(error, idProfessor, SHOW_ENTITY.PROFESSOR);
    }
  }
}
