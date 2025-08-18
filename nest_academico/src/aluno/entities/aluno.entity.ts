import { BaseEntity } from 'src/commons/entity/base.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'ALUNO' })
export class Aluno extends BaseEntity {
  @PrimaryColumn({ name: 'ID_ALUNO', type: 'number' })
  idAluno?: number = 0;

  @Column({ name: 'COD_ALUNO', type: 'varchar2', length: 20, nullable: false })
  codAluno: string = '';

  @Column({ name: 'NOME_ALUNO', type: 'varchar2', length: 100, nullable: false })
  nomeAluno: string = '';

  @Column({ name: 'IDADE', type: 'number', nullable: true })
  idade: number = 0;

  @OneToOne(() => Usuario, (usuario) => usuario.aluno, {
    nullable: true,
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'ID_USUARIO' })
  usuario!: Usuario;

  constructor(data: Partial<Aluno> = {}) {
    super();
    Object.assign(this, data);
  }
}
