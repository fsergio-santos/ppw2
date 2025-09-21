import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { UsuarioRequest } from 'src/usuario/dto/request/usuario.request';
import { Repository } from 'typeorm';
import { ConverterProfessor } from '../dto/converter/professor.converter';
import { ProfessorRequest } from '../dto/request/professor.request';
import { ProfessorResponse } from '../dto/response/professor.response';
import { Professor } from '../entities/professor.entity';

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

  createProfessorInstance(usuarioRequest: UsuarioRequest): Professor {
    const professor = new Professor();
    professor.codProfessor = usuarioRequest.codProfessor ?? professor.codProfessor;
    professor.nomeProfessor = usuarioRequest.nomeProfessor ?? professor.nomeProfessor;

    return professor;
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
