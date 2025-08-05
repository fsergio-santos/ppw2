import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Aluno } from '../entities/aluno.entity';
import { AlunoResponse } from '../dto/response/aluno.response';
import { ConverterAluno } from '../dto/converter/aluno.converter';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';

@Injectable()
export class AlunoServiceFindOne {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  async findOne(idAluno: number): Promise<AlunoResponse | null> {
    const alunoExistente = await this.findById(idAluno);
    if (!alunoExistente) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${idAluno}`);
    }

    return ConverterAluno.toAlunoResponse(alunoExistente);
  }

  async findById(idAluno: number): Promise<Aluno | null> {
    const alunoExistente = await this.alunoRepository
      .createQueryBuilder('aluno')
      .leftJoinAndSelect('aluno.usuario', 'usuario')
      .leftJoinAndSelect('usuario.cidade', 'cidade')
      .where('aluno.ID_ALUNO = :idAluno', { idAluno: idAluno })
      .getOne();

    return alunoExistente;
  }
}
