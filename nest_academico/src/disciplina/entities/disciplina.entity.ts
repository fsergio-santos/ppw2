import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { PROFESSOR } from '../../professor/constants/professor.constants';
import { Professor } from '../../professor/entities/professor.entity';
import { DISCIPLINA } from '../constants/disciplina.constants';

@Entity(DISCIPLINA.TABLE)
export class Disciplina {
  @PrimaryGeneratedColumn('increment', { name: DISCIPLINA.TABLE_FIELD.ID_DISCIPLINA, type: 'number' })
  idDisciplina?: number;

  @Column({
    name: DISCIPLINA.TABLE_FIELD.PERIODO,
    type: 'number',
    nullable: false,
  })
  periodo: number = 0;

  @Column({
    name: DISCIPLINA.TABLE_FIELD.NOME_DISCIPLINA,
    type: 'varchar2',
    length: 50,
    nullable: false,
  })
  nomeDisciplina: string = '';

  @ManyToOne(() => Professor, { nullable: false })
  @JoinColumn({ name: PROFESSOR.TABLE_FIELD.ID_PROFESSOR, referencedColumnName: PROFESSOR.FIELDS.ID })
  professor!: Professor | null;

  @Exclude()
  @ManyToMany(() => Aluno, (aluno) => aluno.disciplinas)
  alunos!: Aluno[] | null;

  constructor(data: Partial<Disciplina> = {}) {
    Object.assign(this, data);
  }
}
