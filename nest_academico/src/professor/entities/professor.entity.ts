import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/commons/entity/base.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Disciplina } from '../../disciplina/entities/disciplina.entity';

@Entity('PROFESSOR')
export class Professor extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'ID_PROFESSOR', type: 'number' })
  idProfessor?: number;

  @Column({
    name: 'COD_PROFESSOR',
    type: 'varchar2',
    length: 20,
    nullable: false,
  })
  codProfessor: string = '';

  @Column({
    name: 'NOME_PROFESSOR',
    type: 'varchar2',
    length: 100,
    nullable: false,
  })
  nomeProfessor: string = '';

  @OneToOne(() => Usuario, (usuario) => usuario.professor, {
    nullable: false,
  })
  @JoinColumn({ name: 'ID_USUARIO', referencedColumnName: 'idUsuario' })
  usuario!: Usuario | null;

  @Exclude()
  @OneToMany(() => Disciplina, (disciplina) => disciplina.professor, {
    nullable: false,
  })
  disciplina!: Disciplina | null;

  constructor(data: Partial<Professor> = {}) {
    super();
    Object.assign(this, data);
  }
}
