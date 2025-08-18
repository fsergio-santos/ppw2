import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Permissions } from './permission.entity';

@Entity({ name: 'ROLE' })
export class Role extends BaseEntity {
  @PrimaryColumn({ name: 'ID_ROLE', type: 'number' })
  idRole: number = 0;

  @Column({ name: 'NOME_ROLE', type: 'varchar2', length: 50, unique: true, nullable: false })
  nomeRole: string = '';

  @OneToMany(() => Permissions, (permission) => permission.role)
  permissions!: Permissions[];

  @ManyToMany(() => Usuario, (usuario) => usuario.roles)
  usuarios!: Usuario[];

  constructor(data: Partial<Role> = {}) {
    super();
    Object.assign(this, data);
  }
}
