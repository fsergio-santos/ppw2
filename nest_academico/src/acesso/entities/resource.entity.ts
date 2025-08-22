import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Permissions } from './permission.entity';
@Entity({ name: 'RECURSO' })
export class Resource extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'ID_RECURSO', type: 'number' })
  idResource: number = 0;

  @Column({ name: 'NOME_RECURSO', type: 'varchar2', length: 50, unique: true, nullable: false })
  nomeResource: string = '';

  @OneToMany(() => Permissions, (permission) => permission.resource)
  permissions!: Permissions[];

  constructor(data: Partial<Resource> = {}) {
    super();
    Object.assign(this, data);
  }
}
