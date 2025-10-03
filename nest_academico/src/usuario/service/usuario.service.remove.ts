import { ConflictException, Injectable } from '@nestjs/common';
import { TokenPayloadDto } from 'src/auth/dto/token.payload';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { DataSource } from 'typeorm';
import { AlunoServiceCount } from '../../aluno/service/aluno.service.count';
import { DisciplinaServiceCount } from '../../disciplina/service/disciplina.service.count';
import { TIPO_USUARIO } from '../enum/tipo.usuario.enum';
import { UsuarioServiceFindOne } from './usuario.service.findone';

@Injectable()
export class UsuarioServiceRemove {
  constructor(
    private readonly dataSource: DataSource,
    private usuarioServiceFindOne: UsuarioServiceFindOne,
    private discipliaServiceCount: DisciplinaServiceCount,
    private alunoServiceCount: AlunoServiceCount,
  ) {}

  async remove(idUsuario: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const usuarioExistente = await this.usuarioServiceFindOne.findById(idUsuario);

      if (!usuarioExistente) {
        throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${idUsuario}`);
      }

      if (usuarioExistente.tipo === TIPO_USUARIO.PROFESSOR && usuarioExistente.professor) {
        const total = await this.discipliaServiceCount.count(idUsuario);

        if (total > 0) {
          throw new ConflictException(`Não é possível excluir: o professor possui ${total} de disciplinas atribuidas `);
        }
      }

      if (usuarioExistente.tipo === TIPO_USUARIO.ALUNO && usuarioExistente.aluno) {
        const total = await this.alunoServiceCount.count(idUsuario);

        if (total > 0) {
          throw new ConflictException(
            `Não é possível excluir: o aluno está matrículado em ${total} disciplinas do curso `,
          );
        }
      }

      if (usuarioExistente.professor) {
        await queryRunner.manager.remove(usuarioExistente.professor);
      } else if (usuarioExistente.aluno) {
        await queryRunner.manager.remove(usuarioExistente.aluno);
      }

      await queryRunner.manager.remove(usuarioExistente);
      await queryRunner.commitTransaction();
    } catch (error: any) {
      tratarErroBanco(error);
    } finally {
      await queryRunner.release();
    }
  }
}
