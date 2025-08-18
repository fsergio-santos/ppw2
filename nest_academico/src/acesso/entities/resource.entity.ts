import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Permissions } from './permission.entity';
@Entity({ name: 'RESOURCE' })
export class Resource extends BaseEntity {
  @PrimaryColumn({ name: 'ID_RESOURCE', type: 'number' })
  idResource: number = 0;

  @Column({ name: 'NOME_RESOURCE', type: 'varchar2', length: 50, unique: true, nullable: false })
  nomeResource: string = '';

  @OneToMany(() => Permissions, (permission) => permission.resource)
  permissions!: Permissions[];

  constructor(data: Partial<Resource> = {}) {
    super();
    Object.assign(this, data);
  }
}
