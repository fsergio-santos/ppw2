import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { tratarErroBanco } from 'src/commons/banco/error.database';
import { UsuarioRequest } from 'src/usuario/dto/request/usuario.request';
import { ConverterAluno } from '../dto/converter/aluno.converter';
import { AlunoRequest } from '../dto/request/aluno.request';
import { AlunoResponse } from '../dto/response/aluno.response';
import { Aluno } from '../entities/aluno.entity';

@Injectable()
export class AlunoServiceCreate {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  async create(alunoRequest: AlunoRequest): Promise<AlunoResponse> {
    try {
      let aluno = ConverterAluno.toAluno(alunoRequest);
      aluno = await this.alunoRepository.save(aluno);
      return ConverterAluno.toAlunoResponse(aluno);
    } catch (error: any) {
      tratarErroBanco(error);
    }
  }

  createAlunoInstance(usuarioRequest: UsuarioRequest): Aluno {
    const aluno = new Aluno();

    aluno.codAluno = usuarioRequest.codAluno ?? aluno.codAluno;
    aluno.nomeAluno = usuarioRequest.nomeAluno ?? aluno.nomeAluno;
    aluno.idade = usuarioRequest.idade ?? aluno.idade;

    return aluno;
  }
}
