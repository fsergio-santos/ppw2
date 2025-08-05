import { Exclude } from 'class-transformer';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Cidade } from 'src/cidade/entities/cidade.entity';
import { Professor } from 'src/professor/entities/professor.entity';
import { Entity, Column, OneToOne, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { TIPO_USUARIO } from '../enum/tipo.usuario.enum';
import { STATUS_USUARIO } from '../enum/status.usuario.enum';
import { BaseEntity } from 'src/commons/entity/base.entity';

@Entity({ name: 'USUARIO' })
export class Usuario extends BaseEntity {
  @PrimaryColumn({ name: 'ID_USUARIO', type: 'number' })
  idUsuario?: number;

  @Column({ name: 'COD_USUARIO' })
  codUsuario: string = '';

  @Column({ name: 'NOME_USUARIO' })
  nomeUsuario: string = '';

  @Column({ name: 'EMAIL', unique: true })
  email: string = '';

  @Column({ name: 'SENHA' })
  senha: string = '';

  @Column({ name: 'FOTO', nullable: true })
  foto: string = '';

  @Column({ name: 'TIPO', nullable: false, type: 'int' })
  tipo!: TIPO_USUARIO;

  @Column({ name: 'ATIVO', default: 0 })
  ativo!: STATUS_USUARIO;

  @Exclude() // Exclui o campo da serialização JSON se usar class-transformer
  @ManyToOne(() => Cidade, { nullable: false }) // Lazy loading (por padrão no TypeORM)
  @JoinColumn({ name: 'ID_CIDADE' })
  cidade!: Cidade;

  @Exclude()
  @OneToOne(() => Professor, (professor) => professor.usuario, {
    nullable: true,
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  professor!: Professor;

  @Exclude()
  @OneToOne(() => Aluno, (aluno) => aluno.usuario, {
    nullable: true,
    cascade: ['insert', 'update', 'remove'],
  })
  aluno!: Aluno;

  constructor(data: Partial<Usuario> = {}) {
    super();
    Object.assign(this, data);
  }
}
