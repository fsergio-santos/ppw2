import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioRequest } from 'src/usuario/dto/request/usuario.request';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { Repository } from 'typeorm';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { Professor } from '../entities/professor.entity';
import { ProfessorRequest } from '../dto/request/professor.request';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ConverterProfessor } from '../dto/converter/professor.converter';

@Injectable()
export class ProfessorServiceCreate {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
  ) {}

  async create(professorRequest: ProfessorRequest): Promise<ProfessorResponse> {
    try {
      let professor = ConverterProfessor.toProfessor(professorRequest);
      professor = await this.professorRepository.save(professor);
      return ConverterProfessor.toProfessorResponse(professor);
    } catch (error: any) {
      tratarErroBanco(error, 0, SHOW_ENTITY.PROFESSOR);
    }
  }

  async createOrUpdateProfessor(usuario: Usuario, usuarioRequest: UsuarioRequest): Promise<Professor> {
    let professor = await this.professorRepository
      .createQueryBuilder('professor')
      .leftJoinAndSelect('professor.usuario', 'usuario')
      .where('usuario.idUsuario = :idUsuario', { idUsuario: usuario.idUsuario })
      .getOne();

    if (!professor) {
      professor = new Professor();
      professor.usuario = usuario;
    }

    professor.codProfessor = usuarioRequest.codProfessor ?? professor.codProfessor;
    professor.nomeProfessor = usuarioRequest.nomeProfessor ?? professor.nomeProfessor;

    try {
      return this.professorRepository.save(professor);
    } catch (error: any) {
      tratarErroBanco(error);
    }
  }
}

// const query = `
//     SELECT
//       p.ID_PROFESSOR,
//       p.COD_PROFESSOR,
//       p.NOME_PROFESSOR,
//       p.ID_USUARIO,
//       u.ID_USUARIO as USUARIO_ID,
//       u.NOME_USUARIO as USUARIO_NOME
//     FROM PROFESSOR p
//     LEFT JOIN USUARIO u ON p.ID_USUARIO = u.ID_USUARIO
//     WHERE ID_PROFESSOR = :idProfessor
//     AND ROWNUM = 1
// `;
// const rawResult: ProfessorRawResult[] = await this.professorRepository.query(query, [idProfessor]);
// if (!rawResult || rawResult.length === 0) {
//   throw new NotFoundException(`Professor não localizado com o código ${idProfessor} informado.`);
// }
// console.log(rawResult);
// const professor = new Professor();
// const firstResult = rawResult[0];
// professor.idProfessor = firstResult.ID_PROFESSOR;
// professor.codProfessor = firstResult.COD_PROFESSOR;
// professor.nomeProfessor = firstResult.NOME_PROFESSOR;
// const usuario = new Usuario();
// usuario.idUsuario = firstResult.USUARIO_ID;
// usuario.nomeUsuario = firstResult.USUARIO_NOME ?? '';
// professor.usuario = usuario;
// return professor;
