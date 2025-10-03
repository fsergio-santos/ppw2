import { Injectable } from '@nestjs/common';
import { AlunoServiceCreate } from 'src/aluno/service/aluno.service.create';
import { HashingService } from 'src/auth/hash/hashing.service';
import { CidadeServiceFindOne } from 'src/cidade/service/cidade.service.findone';
import { ProfessorServiceCreate } from 'src/professor/service/professor.service.create';
import { DataSource } from 'typeorm';
import { MENSAGENS_GENERICAS } from '../../commons/enum/mensagem.generica.enum';
import { EmailException } from '../../commons/exceptions/error/email.exception';
import { EntityNotFoundException } from '../../commons/exceptions/error/entity.exception';
import { ConverterUsuario } from '../dto/converter/usuario.converter';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { TIPO_USUARIO } from '../enum/tipo.usuario.enum';
import { UsuarioServiceFindEmail } from './usuario.service.findemail';

@Injectable()
export class UsuarioServiceCreate {
  constructor(
    private readonly dataSource: DataSource,
    private usuarioServiceFindEmail: UsuarioServiceFindEmail,
    private cidadeService: CidadeServiceFindOne,
    private professorService: ProfessorServiceCreate,
    private alunoService: AlunoServiceCreate,
    private readonly hashingService: HashingService,
  ) {}

  async create(usuarioRequest: UsuarioRequest): Promise<UsuarioResponse | null> {
    await this.validarEmailUnico(usuarioRequest.email);
    const cidadeExistente = await this.cidadeService.findById(usuarioRequest.idCidade);
    if (!cidadeExistente) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${usuarioRequest.idCidade}`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const usuario = ConverterUsuario.toUsuario(usuarioRequest);
      usuario.cidade = cidadeExistente;
      usuario.senha = await this.hashingService.hash(usuario.senha);

      if (usuario.tipo === TIPO_USUARIO.PROFESSOR) {
        const professor = this.professorService.createProfessorInstance(usuarioRequest);
        usuario.professor = professor; // Associa a instância
      } else {
        const aluno = this.alunoService.createAlunoInstance(usuarioRequest);
        usuario.aluno = aluno; // Associa a instância
      }

      const usuarioSalvo = await queryRunner.manager.save(usuario);

      // Confirma a transação
      await queryRunner.commitTransaction();

      return ConverterUsuario.toUsuarioResponse(usuarioSalvo);
    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      //tratarErroBanco(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
    return null;
  }

  private async validarEmailUnico(email: string): Promise<void> {
    const usuarioExistente = await this.usuarioServiceFindEmail.findByEmail(email);
    if (usuarioExistente) {
      throw new EmailException(`${MENSAGENS_GENERICAS.EMAIL_CADASTRADO} -  ${email} `);
    }
  }
}

// async create(usuarioRequest: UsuarioRequest): Promise<UsuarioResponse> {
//     const usuario = ConverterUsuario.toUsuario(usuarioRequest);
//     try {
//       const usuarioCadastrado = await this.usuarioRepository
//         .createQueryBuilder('u')
//         .where('u.email = :email', { email: usuario.email })
//         .getOne();

//       if (usuarioCadastrado) {
//         throw new EmailException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} -  ${usuario.email} `);
//       }

//       const cidade = usuario.cidade;
//       if (!cidade.idCidade) {
//         throw new UnprocessableEntityException(MENSAGENS_GENERICAS.NAO_ENCONTRADO);
//       }

//       const cidadeExistente = await this.cidadeService.findById(cidade.idCidade);

//       if (cidadeExistente) {
//         usuario.cidade = cidadeExistente;
//       }

//       usuario.senha = await this.hashingService.hash(usuario.senha);

//       await this.usuarioRepository.createQueryBuilder().insert().into(Usuario).values(usuario).execute();

//       let usuarioInserido = await this.usuarioRepository
//         .createQueryBuilder('u')
//         .where('u.email = :email', { email: usuario.email })
//         .getOne();

//       if (!usuarioInserido) {
//         throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${usuario.email} `);
//       }

//       if (usuario.tipo === TIPO_USUARIO.PROFESSOR) {
//         const professor = await this.professorService.createOrUpdateProfessor(usuarioInserido, usuarioRequest);
//         usuarioInserido.professor = professor;
//         usuarioInserido = await this.usuarioRepository.save(usuarioInserido);
//       } else {
//         const aluno = await this.alunoService.createOrUpdateAluno(usuarioInserido, usuarioRequest);
//         usuarioInserido.aluno = aluno;
//         usuarioInserido = await this.usuarioRepository.save(usuarioInserido);
//       }
//       return ConverterUsuario.toUsuarioResponde(usuarioInserido);
//     } catch (error: any) {
//       tratarErroBanco(error);
//     }
//   }
