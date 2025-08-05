import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { Repository } from 'typeorm';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Professor } from '../entities/professor.entity';
import { ProfessorServiceFindOne } from './professor.service.findone';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';

@Injectable()
export class ProfessorServiceRemove {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private findOne: ProfessorServiceFindOne,
  ) {}

  async remove(idProfessor: number, deleteUsuario: boolean | null = false): Promise<void> {
    const professorExistente = await this.findOne.findById(idProfessor);

    if (!professorExistente) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${idProfessor}`);
    }

    try {
      if (professorExistente.idProfessor) {
        await this.professorRepository.delete(professorExistente.idProfessor);
      }
      if (professorExistente.usuario?.idUsuario && deleteUsuario) {
        await this.usuarioRepository.delete(professorExistente.usuario.idUsuario);
      }
    } catch (error) {
      tratarErroBanco(error);
    }
  }
}
