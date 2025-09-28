import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/commons/entity/base.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Disciplina } from '../../disciplina/entities/disciplina.entity';
import { ALUNO } from '../constants/aluno.constants';
import { USUARIO } from '../../usuario/constants/usuario.constants';


@Entity(ALUNO.TABLE)
export class Aluno extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: ALUNO.TABLE_FIELD.ID_ALUNO, type: 'number' })
  idAluno?: number = 0;

  @Column({ name: ALUNO.TABLE_FIELD.COD_ALUNO, type: 'varchar2', length: 20, nullable: false })
  codAluno: string = '';

  @Column({
    name: ALUNO.TABLE_FIELD.NOME_ALUNO,
    type: 'varchar2',
    length: 100,
    nullable: false,
  })
  nomeAluno: string = '';

  @Column({ name: ALUNO.TABLE_FIELD.IDADE, type: 'number', nullable: false })
  idade: number = 0;

  @OneToOne(() => Usuario, (usuario) => usuario.aluno, {
    nullable: false,
  })
  @JoinColumn({ name: USUARIO.TABLE_FIELD.ID_USUARIO, referencedColumnName: ALUNO.FIELDS.ID })
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
