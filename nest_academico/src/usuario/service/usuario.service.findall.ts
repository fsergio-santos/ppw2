import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { ConverterUsuario } from '../dto/converter/usuario.converter';

@Injectable()
export class UsuarioServiceFindAll {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<UsuarioResponse[]> {
    const usuarios = await this.usuarioRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.cidade', 'cidade')
      .getMany();
    return ConverterUsuario.toListUsuarioResponse(usuarios);
  }
}
