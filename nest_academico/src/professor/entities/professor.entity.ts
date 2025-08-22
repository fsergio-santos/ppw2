import { BaseEntity } from 'src/commons/entity/base.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PROFESSOR')
export class Professor extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'ID_PROFESSOR', type: 'number' })
  idProfessor?: number;

  @Column({ name: 'COD_PROFESSOR', type: 'varchar2', length: 20, nullable: false })
  codProfessor: string = '';

  @Column({ name: 'NOME_PROFESSOR', type: 'varchar2', length: 100, nullable: false })
  nomeProfessor: string = '';

  @OneToOne(() => Usuario, (usuario) => usuario.professor, {
    nullable: true,
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'ID_USUARIO', referencedColumnName: 'idUsuario' })
  usuario!: Usuario;

  constructor(data: Partial<Professor> = {}) {
    super();
    Object.assign(this, data);
  }
}
