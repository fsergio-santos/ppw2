import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ALUNO } from '../constants/aluno.constants';
import { Aluno } from '../entities/aluno.entity';

@Injectable()
export class AlunoServiceCount {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  async count(idAluno: number): Promise<number> {
    const total = await this.alunoRepository
      .createQueryBuilder(ALUNO.ALIAS)
      .select(`COUNT(${ALUNO.ALIAS}.${ALUNO.FIELDS.ID}`, 'count')
      .where(`${ALUNO.ALIAS}.${ALUNO.FIELDS.ID}= :idAluno`, { idAluno: idAluno })
      .getRawOne();

    return parseInt(total.count, 10);
  }
}
