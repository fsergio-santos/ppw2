// src/aluno-disciplina/entities/aluno-disciplina.entity.ts

import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Disciplina } from '../../disciplina/entities/disciplina.entity';
import { MATRICULA } from '../constants/alunodisciplina.constants';

@Entity(MATRICULA.TABLE)
export class AlunoDisciplina extends BaseEntity {
  @PrimaryColumn({ name: MATRICULA.FIELDS.ALUNO_ID, type: 'number' })
  alunoId?: number = 0;

  @PrimaryColumn({ name: MATRICULA.FIELDS.DISCIPLINA_ID, type: 'number' })
  disciplinaId?: number = 0;

  @ManyToOne(() => Aluno, (aluno) => aluno.disciplinas)
  @JoinColumn({ name: 'ALUNO_ID', referencedColumnName: 'idAluno' })
  aluno!: Aluno | null;

  @ManyToOne(() => Disciplina, (disciplina) => disciplina.alunos)
  @JoinColumn({ name: 'DISCIPLINA_ID', referencedColumnName: 'idDisciplina' })
  disciplina!: Disciplina | null;
}
