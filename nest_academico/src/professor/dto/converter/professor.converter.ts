import { Professor } from 'src/professor/entities/professor.entity';
import { ProfessorRequest } from '../request/professor.request';
import { ProfessorResponse } from '../response/professor.response';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Cidade } from 'src/cidade/entities/cidade.entity';
import { plainToInstance } from 'class-transformer';

export class ConverterProfessor {
  static toProfessor(professorRequest: ProfessorRequest): Professor {
    const usuario = new Usuario();
    usuario.idUsuario = professorRequest.usuario.idUsuario;
    usuario.codUsuario = professorRequest.usuario.codUsuario;
    usuario.nomeUsuario = professorRequest.usuario.nomeUsuario;
    usuario.email = professorRequest.usuario.email;
    usuario.senha = professorRequest.usuario.senha;
    usuario.tipo = 1;

    const cidade = new Cidade();
    cidade.idCidade = professorRequest.usuario.idCidade;
    usuario.cidade = cidade;

    const professor = new Professor();
    professor.idProfessor = professorRequest.idProfessor;
    professor.codProfessor = professorRequest.codProfessor ?? '';
    professor.nomeProfessor = professorRequest.nomeProfessor ?? '';
    professor.usuario = usuario;

    return professor;
  }

  static toListProfessorResponse(lista: Professor[] = []): ProfessorResponse[] {
    const professoresUsuario = lista.map((professor) => ({
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
