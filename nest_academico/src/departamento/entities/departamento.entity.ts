import { BaseEntity } from 'src/commons/entity/base.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('DEPARTAMENTO')
export class Departamento extends BaseEntity {
  @PrimaryColumn({ name: 'ID_DEPARTAMENTO', type: 'number' })
  idDepartamentoi?: number;

  @Column({ name: 'COD_DEPARTAMENTO', type: 'varchar' })
  codDepartamentoi: string = '';

  @Column({ name: 'NOME_DEPARTAMENTO', type: 'varchar' })
  nomeDepartamentoi: string = '';

  constructor(data: Partial<Departamento> = {}) {
    super();
    Object.assign(this, data);
  }
}
