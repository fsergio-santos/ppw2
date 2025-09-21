import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Repository } from 'typeorm';
import { ENTITY_ALIAS } from '../../commons/constants/mensagem.sistema';
import { ConverterUsuario } from '../dto/converter/usuario.converter';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioServiceFindOne {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findOne(idUsuario: number): Promise<UsuarioResponse | null> {
    const usuarioExistente = await this.findById(idUsuario);

    if (!usuarioExistente) {
      throw new EntityNotFoundException(
        `${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${idUsuario}`,
      );
    }

    return ConverterUsuario.toUsuarioResponse(usuarioExistente);
  }

  async findById(idUsuario: number): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository
      .createQueryBuilder(ENTITY_ALIAS.USUARIO)
      .leftJoinAndSelect(`${ENTITY_ALIAS.USUARIO}.cidade`, ENTITY_ALIAS.CIDADE)
      .leftJoinAndSelect(`${ENTITY_ALIAS.USUARIO}.professor`,ENTITY_ALIAS.PROFESSOR)
      .leftJoinAndSelect(`${ENTITY_ALIAS.USUARIO}.aluno`, ENTITY_ALIAS.ALUNO)
      .where(`${ENTITY_ALIAS.USUARIO}.idUsuario = :idUsuario`, { idUsuario })
      .getOne();

    return usuario;
  }
}
