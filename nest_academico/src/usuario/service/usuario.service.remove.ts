import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { UsuarioServiceFindOne } from './usuario.service.findone';
import { ProfessorServiceRemove } from 'src/professor/service/professor.service.remove';
import { AlunoServiceRemove } from 'src/aluno/service/aluno.service.remove';
import { Usuario } from '../entities/usuario.entity';
import { TIPO_USUARIO } from '../enum/tipo.usuario.enum';
import { TokenPayloadDto } from 'src/auth/dto/token.payload';
import { AcessoProibidoException } from 'src/commons/exceptions/error/acesso.proibido';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';

@Injectable()
export class UsuarioServiceRemove {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private professorService: ProfessorServiceRemove,
    private alunoService: AlunoServiceRemove,
    private findOne: UsuarioServiceFindOne,
  ) {}

  async remove(idUsuario: number, tokenPayload: TokenPayloadDto): Promise<void> {
    try {
      const usuarioExistente = await this.findOne.findById(idUsuario);

      if (!usuarioExistente) {
        throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${idUsuario}`);
      }

      if (usuarioExistente.idUsuario !== tokenPayload.sub) {
        throw new AcessoProibidoException(MENSAGENS_GENERICAS.SEM_AUTORIZACAO);
      }

      if (usuarioExistente.tipo === TIPO_USUARIO.PROFESSOR) {
        const professor = usuarioExistente.professor;
        if (professor && professor.idProfessor) {
          await this.professorService.remove(professor.idProfessor);
        }
      }

      if (usuarioExistente.tipo === TIPO_USUARIO.ALUNO) {
        const aluno = usuarioExistente.aluno;
        if (aluno && aluno.idAluno) {
          await this.alunoService.remove(aluno.idAluno);
        }
      }

      await this.usuarioRepository.delete(idUsuario);
    } catch (error: any) {
      tratarErroBanco(error);
    }
  }
}
