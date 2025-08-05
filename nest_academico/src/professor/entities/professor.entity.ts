import { BaseEntity } from 'src/commons/entity/base.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity('PROFESSOR')
export class Professor extends BaseEntity {
  @PrimaryColumn({ name: 'ID_PROFESSOR', type: 'int' })
  idProfessor?: number;

  @Column({ name: 'COD_PROFESSOR', type: 'varchar', length: 50, nullable: false })
  codProfessor: string = '';

  @Column({ name: 'NOME_PROFESSOR', type: 'varchar', length: 100, nullable: false })
  nomeProfessor: string = '';

  @OneToOne(() => Usuario, (usuario) => usuario.professor, {
    nullable: true,
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'ID_USUARIO' })
  usuario!: Usuario;

  constructor(data: Partial<Professor> = {}) {
    super();
    Object.assign(this, data);
  }
}
