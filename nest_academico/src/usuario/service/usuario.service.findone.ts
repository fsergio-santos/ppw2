import { Injectable } from '@nestjs/common';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { ConverterUsuario } from '../dto/converter/usuario.converter';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';

@Injectable()
export class UsuarioServiceFindOne {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findOne(idUsuario: number): Promise<UsuarioResponse | null> {
    const usuarioExistente = await this.findById(idUsuario);

    if (!usuarioExistente) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${idUsuario}`);
    }

    return ConverterUsuario.toUsuarioResponde(usuarioExistente);
  }

  async findById(idUsuario: number): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.cidade', 'cidade')
      .leftJoinAndSelect('usuario.professor', 'professor')
      .leftJoinAndSelect('usuario.aluno', 'aluno')
      .where('usuario.ID_USUARIO = :idUsuario', { idUsuario: idUsuario })
      .getOne();

    return usuario;
  }
}
