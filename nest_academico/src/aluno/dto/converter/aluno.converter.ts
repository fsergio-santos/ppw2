import { plainToInstance } from 'class-transformer';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Cidade } from 'src/cidade/entities/cidade.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { AlunoRequest } from '../request/aluno.request';
import { AlunoResponse } from '../response/aluno.response';

export class ConverterAluno {
  static toAluno(alunoRequest: AlunoRequest): Aluno {
    const usuario = new Usuario();
    usuario.idUsuario = alunoRequest.usuario.idUsuario;
    usuario.codUsuario = alunoRequest.usuario.codUsuario;
    usuario.nomeUsuario = alunoRequest.usuario.nomeUsuario;
    usuario.email = alunoRequest.usuario.email;
    usuario.senha = alunoRequest.usuario.senha;
    usuario.tipo = 2;

    const cidade = new Cidade();
    cidade.idCidade = alunoRequest.usuario.idCidade;
    usuario.cidade = cidade;

    const aluno = new Aluno();
    aluno.idAluno = alunoRequest.idAluno;
    aluno.codAluno = alunoRequest.codAluno ?? '';
    aluno.nomeAluno = alunoRequest.nomeAluno ?? '';
    aluno.idade = alunoRequest.idade;
    aluno.usuario = usuario;

    return aluno;
  }

  static toListAlunoResponse(lista: Aluno[] = []): AlunoResponse[] {
    const alunosUsuario = lista.map((aluno) => ({
      idAluno: aluno.idAluno,
      codAluno: aluno.codAluno,
      nomeAluno: aluno.nomeAluno,
      idade: aluno.idade,
      idUsuario: aluno.usuario?.idUsuario,
      nomeUsuario: aluno.usuario?.nomeUsuario,
      email: aluno.usuario?.email,
      nomeCiade: aluno.usuario?.cidade?.nomeCidade,
    }));
    return plainToInstance(AlunoResponse, alunosUsuario, { excludeExtraneousValues: true });
  }

  static toAlunoResponse(aluno: Aluno): AlunoResponse {
    const alunoUsuario = {
      idAluno: aluno.idAluno,
      codAluno: aluno.codAluno,
      nomeAluno: aluno.nomeAluno,
      idade: aluno.idade,
      idUsuario: aluno.usuario?.idUsuario,
      codUsuario: aluno.usuario?.codUsuario,
      nomeUsuario: aluno.usuario?.nomeUsuario,
      email: aluno.usuario?.email,
      nomeCidade: aluno.usuario?.cidade?.nomeCidade,
      foto: aluno.usuario?.foto,
    };
    return plainToInstance(AlunoResponse, alunoUsuario, { excludeExtraneousValues: true });
  }
}
