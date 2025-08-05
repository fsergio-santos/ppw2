import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { Aluno } from '../entities/aluno.entity';
import { AlunoServiceFindOne } from './aluno.service.findone';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';

@Injectable()
export class AlunoServiceRemove {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private findOne: AlunoServiceFindOne,
  ) {}

  async remove(idAluno: number, deleteUsuario: boolean | null = false): Promise<void> {
    const alunoExistente = await this.findOne.findById(idAluno);
    if (!alunoExistente) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${idAluno}`);
    }
    try {
      if (alunoExistente && alunoExistente.idAluno) {
        await this.alunoRepository.delete(alunoExistente.idAluno);
        if (alunoExistente.usuario?.idUsuario && deleteUsuario) {
          await this.usuarioRepository.delete(alunoExistente.usuario.idUsuario);
        }
      }
    } catch (error) {
      tratarErroBanco(error);
    }
  }
}
