import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlunoServiceCreate } from 'src/aluno/service/aluno.service.create';
import { HashingService } from 'src/auth/hash/hashing.service';
import { CidadeServiceFindOne } from 'src/cidade/service/cidade.service.findone';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EmailException } from 'src/commons/exceptions/error/email.exception';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { ProfessorServiceCreate } from 'src/professor/service/professor.service.create';
import { Repository } from 'typeorm';
import { ConverterUsuario } from '../dto/converter/usuario.converter';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { Usuario } from '../entities/usuario.entity';
import { TIPO_USUARIO } from '../enum/tipo.usuario.enum';

@Injectable()
export class UsuarioServiceCreate {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private cidadeService: CidadeServiceFindOne,
    private professorService: ProfessorServiceCreate,
    private alunoService: AlunoServiceCreate,
    private readonly hashingService: HashingService,
  ) {}

  async create(usuarioRequest: UsuarioRequest): Promise<UsuarioResponse> {
    const usuario = ConverterUsuario.toUsuario(usuarioRequest);
    try {
      const usuarioCadastrado = await this.usuarioRepository
        .createQueryBuilder('u')
        .where('u.email = :email', { email: usuario.email })
        .getOne();

      if (usuarioCadastrado) {
        throw new EmailException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} -  ${usuario.email} `);
      }

      const cidade = usuario.cidade;
      if (!cidade.idCidade) {
        throw new UnprocessableEntityException(MENSAGENS_GENERICAS.NAO_ENCONTRADO);
      }

      const cidadeExistente = await this.cidadeService.findById(cidade.idCidade);

      if (cidadeExistente) {
        usuario.cidade = cidadeExistente;
      }

      usuario.senha = await this.hashingService.hash(usuario.senha);

      await this.usuarioRepository.createQueryBuilder().insert().into(Usuario).values(usuario).execute();

      let usuarioInserido = await this.usuarioRepository
        .createQueryBuilder('u')
        .where('u.email = :email', { email: usuario.email })
        .getOne();

      if (!usuarioInserido) {
        throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${usuario.email} `);
      }

      if (usuario.tipo === TIPO_USUARIO.PROFESSOR) {
        const professor = await this.professorService.createOrUpdateProfessor(usuarioInserido, usuarioRequest);
        usuarioInserido.professor = professor;
        usuarioInserido = await this.usuarioRepository.save(usuarioInserido);
      } else {
        const aluno = await this.alunoService.createOrUpdateAluno(usuarioInserido, usuarioRequest);
        usuarioInserido.aluno = aluno;
        usuarioInserido = await this.usuarioRepository.save(usuarioInserido);
      }
      return ConverterUsuario.toUsuarioResponde(usuarioInserido);
    } catch (error: any) {
      tratarErroBanco(error);
    }
  }
}
