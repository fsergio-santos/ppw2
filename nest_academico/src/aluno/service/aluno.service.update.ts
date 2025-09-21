import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tratarErroBanco } from 'src/commons/banco/error.database';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioRequest } from '../../usuario/dto/request/usuario.request';
import { ConverterAluno } from '../dto/converter/aluno.converter';
import { AlunoRequest } from '../dto/request/aluno.request';
import { AlunoResponse } from '../dto/response/aluno.response';
import { Aluno } from '../entities/aluno.entity';
import { AlunoServiceFindOne } from './aluno.service.findone';

@Injectable()
export class AlunoServiceUpdate {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
    @InjectRepository(Usuario)
    private findOne: AlunoServiceFindOne,
  ) {}

  async updatePut(idAluno: number, alunoRequest: AlunoRequest): Promise<AlunoResponse> {
    const alunoExistente = await this.findOne.findById(idAluno);

    if (!alunoExistente) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${idAluno}`);
    }

    let aluno = ConverterAluno.toAluno(alunoRequest);

    const alunoAtualizada = Object.assign(alunoExistente, aluno);

    try {
      aluno = await this.alunoRepository.save(alunoAtualizada);

      return ConverterAluno.toAlunoResponse(alunoAtualizada);
    } catch (error: any) {
      tratarErroBanco(error);
    }
  }

  async prepareForUpdate(usuario: Usuario, request: UsuarioRequest): Promise<Aluno> {
    let aluno = null;

    if (request.idUsuario) {
      aluno = await this.findOne.findById(request.idUsuario);
    }
    if (!aluno) {
      aluno = new Aluno();
    }

    aluno.usuario = usuario;
    aluno.codAluno = request.codAluno ?? '';
    aluno.nomeAluno = request.nomeAluno ?? '';
    aluno.idade = request.idade ?? 0;

    return aluno;
  }
}
