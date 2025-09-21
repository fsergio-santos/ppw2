import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Repository } from 'typeorm';
import { UsuarioRequest } from '../../usuario/dto/request/usuario.request';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ConverterProfessor } from '../dto/converter/professor.converter';
import { ProfessorRequest } from '../dto/request/professor.request';
import { ProfessorResponse } from '../dto/response/professor.response';
import { Professor } from '../entities/professor.entity';
import { ProfessorServiceFindOne } from './professor.service.findone';

@Injectable()
export class ProfessorServiceUpdate {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
    private professorServicefindOne: ProfessorServiceFindOne,
  ) {}

  async updatePut(idProfessor: number, professorRequest: ProfessorRequest): Promise<ProfessorResponse> {
    const professorExistente = await this.professorServicefindOne.findById(idProfessor);

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

  async prepareForUpdate(usuario: Usuario, request: UsuarioRequest): Promise<Professor | null> {
    let professor = null;

    if (request.idProfessor) {
      professor = await this.professorServicefindOne.findById(request.idProfessor);
    }
    if (!professor) {
      professor = new Professor();
    }

    professor.usuario = usuario;
    professor.codProfessor = request.codProfessor ?? '';
    professor.nomeProfessor = request.nomeProfessor ?? '';

    return professor;
  }
}
