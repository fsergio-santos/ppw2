import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Resource } from './resource.entity';
import { Role } from './role.entity';

@Entity('PERMISSIONS')
export class Permissions extends BaseEntity {
  @PrimaryColumn({ name: 'ID_PERMISSION', type: 'int' })
  idPermission: number = 0;

  @ManyToOne(() => Role, (role) => role.permissions, { eager: true })
  @JoinColumn({ name: 'ROLE_ID' })
  role!: Role;

  @ManyToOne(() => Resource, (resource) => resource.permissions, { eager: true })
  @JoinColumn({ name: 'RESOURCE_ID' })
  resource!: Resource;

  @Column({ name: 'ACTION', type: 'varchar2', length: 50 })
  action: string = ''; // create, read, update, delete

  @Column({ name: 'POSSESSION', type: 'varchar2', length: 50 })
  possession: string = ''; // own, any

  @Column({ name: 'ATTRIBUTES', type: 'varchar2', default: '*', length: 10 })
  attributes: string = '';

  constructor(data: Partial<Permissions> = {}) {
    super();
    Object.assign(this, data);
  }
}
