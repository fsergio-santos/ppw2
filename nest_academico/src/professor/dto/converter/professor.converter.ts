import { plainToInstance } from 'class-transformer';
import { Professor } from 'src/professor/entities/professor.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ProfessorRequest } from '../request/professor.request';
import { ProfessorResponse } from '../response/professor.response';

export class ConverterProfessor {
  static toProfessor(professorRequest: ProfessorRequest): Professor {
    const usuario = new Usuario();
    usuario.idUsuario = professorRequest.idUsuario;
    usuario.tipo = 1;

    const professor = new Professor();
    professor.idProfessor = professorRequest.idProfessor;
    professor.codProfessor = professorRequest.codProfessor ?? '';
    professor.nomeProfessor = professorRequest.nomeProfessor ?? '';
    professor.usuario = usuario;

    return professor;
  }

  static toListProfessorResponse(professor: Professor[] = []): ProfessorResponse[] {
    const professoresUsuario = professor.map((professor) => ({
      idProfessor: professor.idProfessor,
      codProfessor: professor.codProfessor,
      nomeProfessor: professor.nomeProfessor,
      idUsuario: professor.usuario?.idUsuario,
      nomeUsuario: professor.usuario?.nomeUsuario,
      email: professor.usuario?.email,
      nomeCidade: professor.usuario?.cidade?.nomeCidade,
    }));
    return plainToInstance(ProfessorResponse, professoresUsuario, { excludeExtraneousValues: true });
  }

  static toProfessorResponse(professor: Professor): ProfessorResponse {
    const professorUsuario = {
      idProfessor: professor.idProfessor,
      codProfessor: professor.codProfessor,
      nomeProfessor: professor.nomeProfessor,
      idUsuario: professor.usuario?.idUsuario,
      codUsuario: professor.usuario?.codUsuario,
      nomeUsuario: professor.usuario?.nomeUsuario,
      email: professor.usuario?.email,
      nomeCidade: professor.usuario?.cidade?.nomeCidade,
      foto: professor.usuario?.foto,
    };
    return plainToInstance(ProfessorResponse, professorUsuario, { excludeExtraneousValues: true });
  }
}
