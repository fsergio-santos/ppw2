import { Injectable } from '@nestjs/common';
import { HashingService } from 'src/auth/hash/hashing.service';
import { CidadeServiceFindOne } from 'src/cidade/service/cidade.service.findone';
import { DataSource } from 'typeorm';
import { AlunoServiceUpdate } from '../../aluno/service/aluno.service.update';
import { tratarErroBanco } from '../../commons/banco/error.database';
import { MENSAGENS_GENERICAS } from '../../commons/enum/mensagem.generica.enum';
import { EmailException } from '../../commons/exceptions/error/email.exception';
import { EntityNotFoundException } from '../../commons/exceptions/error/entity.exception';
import { ProfessorServiceUpdate } from '../../professor/service/professor.service.update';
import { ConverterUsuario } from '../dto/converter/usuario.converter';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { TIPO_USUARIO } from '../enum/tipo.usuario.enum';
import { UsuarioServiceFindEmail } from './usuario.service.findemail';
import { UsuarioServiceFindOne } from './usuario.service.findone';

@Injectable()
export class UsuarioServiceUpdate {
  constructor(
    private readonly dataSource: DataSource,
    private readonly usuarioServiceFindOne: UsuarioServiceFindOne,
    private readonly usuarioServiceFinEmail: UsuarioServiceFindEmail,
    private readonly cidadeService: CidadeServiceFindOne,
    private readonly professorService: ProfessorServiceUpdate,
    private readonly alunoService: AlunoServiceUpdate,
    private readonly hashingService: HashingService,
  ) {}

  async updatePut(idUsuario: number, usuarioRequest: UsuarioRequest): Promise<UsuarioResponse | null> {
    const usuarioExistente = await this.usuarioServiceFindOne.findById(idUsuario);
    if (!usuarioExistente) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} -  ${idUsuario}`);
    }

    if (usuarioRequest.email && usuarioRequest.email !== usuarioExistente.email) {
      const emailEmUso = await this.usuarioServiceFinEmail.findByEmail(usuarioRequest.email);
      if (emailEmUso) {
        throw new EmailException(`${MENSAGENS_GENERICAS.EMAIL_CADASTRADO}  ${usuarioExistente.email}`);
      }
    }

    const cidadeExistente = await this.cidadeService.findById(usuarioRequest.idCidade);

    if (!cidadeExistente) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} -  ${usuarioRequest.idCidade}`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const usuario = ConverterUsuario.toUsuario(usuarioRequest);

      usuario.cidade = cidadeExistente;

      if (usuarioRequest.senha) {
        usuario.senha = await this.hashingService.hash(usuarioRequest.senha);

        if (usuario.tipo === TIPO_USUARIO.PROFESSOR) {
          usuario.aluno = null;
          usuario.professor = await this.professorService.prepareForUpdate(usuario, usuarioRequest);
        } else if (usuario.tipo === TIPO_USUARIO.ALUNO) {
          usuarioExistente.professor = null;
          usuarioExistente.aluno = await this.alunoService.prepareForUpdate(usuario, usuarioRequest);
        }
      }

      const usuarioAtualizado = Object.assign(usuarioExistente, usuario);

      const usuarioCadastrado = await queryRunner.manager.save(usuarioAtualizado);
      await queryRunner.commitTransaction();
      return ConverterUsuario.toUsuarioResponse(usuarioCadastrado);
    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      tratarErroBanco(error);
    } finally {
      await queryRunner.release();
    }
    return null;
  }
}
