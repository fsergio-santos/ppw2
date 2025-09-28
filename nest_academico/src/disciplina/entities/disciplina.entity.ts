import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { Professor } from '../../professor/entities/professor.entity';
import { DISCIPLINA } from '../constants/disciplina.constants';

@Entity(DISCIPLINA.DATABASE_TABLE)
export class Disciplina {
  @PrimaryGeneratedColumn('increment', { name: DISCIPLINA.DATABASE_FIELD.ID_DISCIPLINA, type: 'number' })
  idDisciplina?: number;

  @Column({
    name: DISCIPLINA.DATABASE_FIELD.PERIODO,
    type: 'number',
    nullable: false,
  })
  periodo: number = 0;

  @Column({
    name: DISCIPLINA.DATABASE_FIELD.NOME_DISCIPLINA,
    type: 'varchar2',
    length: 50,
    nullable: false,
  })
  nomeDisciplina: string = '';

  @ManyToOne(() => Professor, { nullable: false })
  @JoinColumn({ name: DISCIPLINA.DATABASE_FIELD.ID_PROFESSOR, referencedColumnName: DISCIPLINA.FIELDS.ID })
  professor!: Professor | null;

  @Exclude()
  @ManyToMany(() => Aluno, (aluno) => aluno.disciplinas)
  alunos!: Aluno[] | null;

  constructor(data: Partial<Disciplina> = {}) {
    Object.assign(this, data);
  }
}

