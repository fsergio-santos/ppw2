// src/aluno-disciplina/entities/aluno-disciplina.entity.ts

import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ALUNO } from '../../aluno/constants/aluno.constants';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { BaseEntity } from '../../commons/entity/base.entity';
import { DISCIPLINA } from '../../disciplina/constants/disciplina.constants';
import { Disciplina } from '../../disciplina/entities/disciplina.entity';
import { MATRICULA } from '../constants/alunodisciplina.constants';

@Entity(MATRICULA.TABLE)
export class Matricula extends BaseEntity {
  @PrimaryColumn({ name: MATRICULA.TABLE_FIELD.ALUNO_ID, type: 'number' })
  alunoId?: number = 0;

  @PrimaryColumn({ name: MATRICULA.TABLE_FIELD.DISCIPLINA_ID, type: 'number' })
  disciplinaId?: number = 0;

  @ManyToOne(() => Aluno, (aluno) => aluno.disciplinas)
  @JoinColumn({ name: MATRICULA.TABLE_FIELD.ALUNO_ID, referencedColumnName: ALUNO.FIELDS.ID })
  aluno!: Aluno | null;

  @ManyToOne(() => Disciplina, (disciplina) => disciplina.alunos)
  @JoinColumn({ name: MATRICULA.TABLE_FIELD.DISCIPLINA_ID, referencedColumnName: DISCIPLINA.FIELDS.ID })
  disciplina!: Disciplina | null;
}
