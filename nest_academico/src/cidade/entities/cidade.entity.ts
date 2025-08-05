import { BaseEntity } from 'src/commons/entity/base.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('CIDADE')
export class Cidade extends BaseEntity {
  @PrimaryColumn({ name: 'ID_CIDADE', type: 'number' })
  idCidade?: number;

  @Column({ name: 'COD_CIDADE', type: 'varchar' })
  codCidade: string = '';

  @Column({ name: 'NOME_CIDADE', type: 'varchar' })
  nomeCidade: string = '';

  @OneToMany(() => Usuario, (usuario) => usuario.cidade)
  usuarios!: Usuario[];

  constructor(data: Partial<Cidade> = {}) {
    super();
    Object.assign(this, data);
  }
}
