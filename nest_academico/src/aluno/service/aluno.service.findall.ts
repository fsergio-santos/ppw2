import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from '../entities/aluno.entity';
import { AlunoResponse } from '../dto/response/aluno.response';
import { ConverterAluno } from '../dto/converter/aluno.converter';

@Injectable()
export class AlunoServiceFindAll {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  async findAll(): Promise<AlunoResponse[]> {
    const alunos = await this.alunoRepository.find({
      relations: ['usuario', 'usuario.cidade'],
    });
    return ConverterAluno.toListAlunoResponse(alunos);
  }
}
