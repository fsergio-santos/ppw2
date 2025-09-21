import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Repository } from 'typeorm';
import { ENTITY_ALIAS } from '../../commons/constants/mensagem.sistema';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioServiceFindEmail {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository
      .createQueryBuilder(ENTITY_ALIAS.USUARIO)
      .where(`${ENTITY_ALIAS.USUARIO}.email = :email`, { email: email })
      .getOne();

    if (!usuario) {
      throw new EntityNotFoundException(MENSAGENS_GENERICAS.LOGIN_NAO_EXISTE);
    }

    return usuario;
  }
}
