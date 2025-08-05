import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { HashingService } from 'src/auth/hash/hashing.service';
import { ConverterUsuario } from '../dto/converter/usuario.converter';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { EmailException } from 'src/commons/exceptions/error/email.exception';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { CidadeServiceFindOne } from 'src/cidade/service/cidade.service.findone';
import { ProfessorServiceCreate } from 'src/professor/service/professor.service.create';
import { AlunoServiceCreate } from 'src/aluno/service/aluno.service.create';
import { TokenPayloadDto } from 'src/auth/dto/token.payload';
import { AcessoProibidoException } from 'src/commons/exceptions/error/acesso.proibido';
import { TIPO_USUARIO } from '../enum/tipo.usuario.enum';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';

@Injectable()
export class UsuarioServiceUpdate {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private cidadeService: CidadeServiceFindOne,
    private professorService: ProfessorServiceCreate,
    private alunoService: AlunoServiceCreate,
    private readonly hashingService: HashingService,
  ) {}

  async updatePut(
    idUsuario: number,
    usuarioRequest: UsuarioRequest,
    tokenPayload: TokenPayloadDto,
  ): Promise<UsuarioResponse> {
    try {
      const usuarioExistente = await this.usuarioRepository
        .createQueryBuilder('u')
        .leftJoinAndSelect('u.cidade', 'cidade')
        .leftJoinAndSelect('u.professor', 'professor')
        .leftJoinAndSelect('u.aluno', 'aluno')
        .where('u.idUsuario = :idUsuario', { idUsuario })
        .getOne();

      if (!usuarioExistente) {
        throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} ${idUsuario}`);
      }

      if (usuarioExistente.idUsuario !== tokenPayload.sub) {
        throw new AcessoProibidoException(MENSAGENS_GENERICAS.SEM_AUTORIZACAO);
      }

      if (usuarioRequest.email && usuarioRequest.email !== usuarioExistente.email) {
        const usuarioCadastrado = await this.usuarioRepository
          .createQueryBuilder('u')
          .leftJoinAndSelect('u.cidade', 'cidade')
          .leftJoinAndSelect('u.professor', 'professor')
          .leftJoinAndSelect('u.aluno', 'aluno')
          .where('u.email = :email', { email: usuarioRequest.email })
          .getOne();

        if (usuarioCadastrado && usuarioCadastrado.idUsuario !== idUsuario) {
          throw new EmailException(`${MENSAGENS_GENERICAS.EMAIL_CADASTRADO}  ${usuarioCadastrado.email}`);
        }
      }

      const usuario = ConverterUsuario.toUsuario(usuarioRequest);

      if (!usuario.cidade.idCidade) {
        throw new UnprocessableEntityException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} ${usuario.cidade.idCidade}.`);
      }

      const cidadeExistente = await this.cidadeService.findById(usuario.cidade.idCidade);

      if (cidadeExistente) {
        usuarioExistente.cidade = cidadeExistente;
      }

      for (const [chave, valor] of Object.entries(usuario)) {
        if (valor !== undefined && chave in usuarioExistente && (usuarioExistente as any)[chave] !== valor) {
          (usuarioExistente as any)[chave] = valor;
        }
      }

      usuarioExistente.senha = await this.hashingService.hash(usuarioExistente.senha);

      if (usuario.tipo === TIPO_USUARIO.PROFESSOR) {
        const professor = await this.professorService.createOrUpdateProfessor(usuarioExistente, usuarioRequest);
        usuarioExistente.professor = professor;
      } else if (usuario.tipo === TIPO_USUARIO.ALUNO) {
        const aluno = await this.alunoService.createOrUpdateAluno(usuarioExistente, usuarioRequest);
        usuarioExistente.aluno = aluno;
      }

      const usuarioAtualizado = await this.usuarioRepository.save(usuarioExistente);

      return ConverterUsuario.toUsuarioResponde(usuarioAtualizado);
    } catch (error: any) {
      tratarErroBanco(error);
    }
  }
}
