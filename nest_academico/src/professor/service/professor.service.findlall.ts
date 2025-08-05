import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from '../entities/professor.entity';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ConverterProfessor } from '../dto/converter/professor.converter';

@Injectable()
export class ProfessorServiceFindAll {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
  ) {}

  async findAll(): Promise<ProfessorResponse[]> {
    const professores = await this.professorRepository.find({
      relations: ['usuario', 'usuario.cidade'],
    });
    return ConverterProfessor.toListProfessorResponse(professores);
  }
}
