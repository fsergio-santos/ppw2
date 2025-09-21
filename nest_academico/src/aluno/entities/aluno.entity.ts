import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/commons/entity/base.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Disciplina } from '../../disciplina/entities/disciplina.entity';

@Entity({ name: 'ALUNO' })
export class Aluno extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'ID_ALUNO', type: 'number' })
  idAluno?: number = 0;

  @Column({ name: 'COD_ALUNO', type: 'varchar2', length: 20, nullable: false })
  codAluno: string = '';

  @Column({
    name: 'NOME_ALUNO',
    type: 'varchar2',
    length: 100,
    nullable: false,
  })
  nomeAluno: string = '';

  @Column({ name: 'IDADE', type: 'number', nullable: true })
  idade: number = 0;

  @OneToOne(() => Usuario, (usuario) => usuario.aluno, {
    nullable: false,
  })
  @JoinColumn({ name: 'ID_USUARIO', referencedColumnName: 'idUsuario' })
  usuario!: Usuario | null;

  @Exclude()
  @ManyToMany(() => Disciplina, (disciplina) => disciplina.alunos)
  @JoinTable({
    name: 'ALUNO_DISCIPLINA',
    joinColumn: {
      name: 'ALUNO_ID',
      referencedColumnName: 'idAluno',
    },
    inverseJoinColumn: {
      name: 'DISCIPLINA_ID',
      referencedColumnName: 'idDisciplina',
    },
  })
  disciplinas!: Disciplina[] | null;

  constructor(data: Partial<Aluno> = {}) {
    super();
    Object.assign(this, data);
  }
}
