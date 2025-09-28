import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DISCIPLINA } from '../constants/disciplina.constants';
import { Disciplina } from '../entities/disciplina.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DisciplinaServiceCount {
  constructor(
    @InjectRepository(Disciplina)
    private disciplinaRepository: Repository<Disciplina>,
  ) {}

  async count(idProfessor: number): Promise<number> {
    const total = await this.disciplinaRepository
      .createQueryBuilder(DISCIPLINA.ALIAS)
      .select(`COUNT(${DISCIPLINA.ALIAS}.${DISCIPLINA.FIELDS.IDPROFESSOR}`, 'count')
      .where(`${DISCIPLINA.ALIAS}.${DISCIPLINA.FIELDS.IDPROFESSOR}= :idProfessor`, { idProfessor: idProfessor })
      .getRawOne();

    return parseInt(total.count, 10);
  }
}
