import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/commons/entity/base.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CIDADE')
export class Cidade extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'ID_CIDADE', type: 'number' })
  idCidade?: number;

  @Column({ name: 'COD_CIDADE', type: 'varchar2', length: 20 })
  codCidade: string = '';

  @Column({ name: 'NOME_CIDADE', type: 'varchar2', length: 100 })
  nomeCidade: string = '';

  @Exclude()
  @OneToMany(() => Usuario, (usuario) => usuario.cidade)
  usuarios!: Usuario[];

  constructor(data: Partial<Cidade> = {}) {
    super();
    Object.assign(this, data);
  }
}
