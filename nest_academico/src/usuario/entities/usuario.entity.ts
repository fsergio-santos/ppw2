import { Exclude } from 'class-transformer';
import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Cidade } from 'src/cidade/entities/cidade.entity';
import { BaseEntity } from 'src/commons/entity/base.entity';
import { Professor } from 'src/professor/entities/professor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../acesso/entities/role.entity';
import { STATUS_USUARIO } from '../enum/status.usuario.enum';
import { TIPO_USUARIO } from '../enum/tipo.usuario.enum';

@Entity({ name: 'USUARIO' })
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'ID_USUARIO', type: 'number' })
  idUsuario?: number;

  @Column({ name: 'COD_USUARIO', type: 'varchar2', length: 20 })
  codUsuario: string = '';

  @Column({ name: 'NOME_USUARIO', type: 'varchar2', length: 100 })
  nomeUsuario: string = '';

  @Column({ name: 'EMAIL', type: 'varchar2', unique: true, length: 100 })
  email: string = '';

  @Column({ name: 'SENHA', type: 'varchar2', length: 100 })
  senha: string = '';

  @Column({ name: 'FOTO', type: 'varchar2', nullable: true, length: 100 })
  foto: string = '';

  @Column({ name: 'TIPO', nullable: false, type: 'int' })
  tipo!: TIPO_USUARIO;

  @Column({ name: 'ATIVO', default: 0 })
  ativo!: STATUS_USUARIO;

  @Exclude() // Exclui o campo da serialização JSON se usar class-transformer
  @ManyToOne(() => Cidade, { nullable: false }) // Lazy loading (por padrão no TypeORM)
  @JoinColumn({ name: 'ID_CIDADE' })
  cidade!: Cidade | null;

  @Exclude()
  @OneToOne(() => Professor, (professor) => professor.usuario, {
    nullable: true,
    cascade: ['insert', 'update'],
  })
  professor!: Professor | null;

  @Exclude()
  @OneToOne(() => Aluno, (aluno) => aluno.usuario, {
    nullable: true,
    cascade: ['insert', 'update'],
  })
  aluno!: Aluno | null;

  @ManyToMany(() => Role, (role) => role.usuarios, { eager: true })
  @JoinTable({
    name: 'USUARIO_ROLE',
    joinColumn: { name: 'USUARIO_ID', referencedColumnName: 'idUsuario' },
    inverseJoinColumn: { name: 'ROLE_ID', referencedColumnName: 'idRole' },
  })
  roles!: Role[];

  constructor(data: Partial<Usuario> = {}) {
    super();
    Object.assign(this, data);
  }
}
