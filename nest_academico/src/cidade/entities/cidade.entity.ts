import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/commons/entity/base.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CIDADE } from '../constants/cidade.constants';

@Entity(CIDADE.DATABASE_TABLE)
export class Cidade extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: CIDADE.DATABASE_FIELD.ID_CIDADE, type: 'number' })
  idCidade?: number;

  @Column({ name: CIDADE.DATABASE_FIELD.COD_CIDADE, type: 'varchar2', length: 20 })
  codCidade: string = '';

  @Column({ name: CIDADE.DATABASE_FIELD.NOME_CIDADE, type: 'varchar2', length: 100 })
  nomeCidade: string = '';

  @Exclude()
  @OneToMany(() => Usuario, (usuario) => usuario.cidade)
  usuarios!: Usuario[];

  constructor(data: Partial<Cidade> = {}) {
    super();
    Object.assign(this, data);
  }
}
