import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { Professor } from '../../professor/entities/professor.entity';

@Entity('DISCIPLINA')
export class Disciplina {
  @PrimaryGeneratedColumn('increment', { name: 'ID_DISCIPLINA', type: 'number' })
  idDisciplina?: number;

  @Column({
    name: 'PERIODO',
    type: 'number',
    nullable: false,
  })
  periodo: number = 0;

  @Column({
    name: 'NOME_DISCIPLINA',
    type: 'varchar2',
    length: 50,
    nullable: false,
  })
  nomeDisciplina: string = '';

  @ManyToOne(() => Professor, { nullable: false })
  @JoinColumn({ name: 'ID_PROFESSOR', referencedColumnName: 'idProfessor' })
  professor!: Professor | null;

  @Exclude()
  @ManyToMany(() => Aluno, (aluno) => aluno.disciplinas)
  alunos!: Aluno[] | null;

  constructor(data: Partial<Professor> = {}) {
    Object.assign(this, data);
  }
}
