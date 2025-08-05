import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { UsuarioBloqueadoException } from 'src/commons/exceptions/error/usuario.bloqueado';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { STATUS_USUARIO } from 'src/usuario/enum/status.usuario.enum';
import { UsuarioServiceFindOne } from 'src/usuario/service/usuario.service.findone';
import { Repository } from 'typeorm';
import { ChangePasswordRequest } from '../dto/request/change.password.request';
import { HashingService } from '../hash/hashing.service';

@Injectable()
export class ChangePasswordService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly usuarioServiceFindById: UsuarioServiceFindOne,
    private readonly hashingService: HashingService,
  ) {}

  async changePassword(changePassword: ChangePasswordRequest): Promise<boolean | null> {
    if (!changePassword.idUsuario) {
      throw new EntityNotFoundException(MENSAGENS_GENERICAS.ID_OBRIGATORIO);
    }

    const usuario = await this.usuarioServiceFindById.findById(changePassword.idUsuario);

    if (!usuario) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${changePassword.idUsuario}`);
    }

    if (usuario.ativo === STATUS_USUARIO.BLOQUEADO) {
      throw new UsuarioBloqueadoException(MENSAGENS_GENERICAS.ACESSO_PROIBIDO);
    }

    const isMatch = await this.hashingService.compare(changePassword.senhaAntiga, usuario.senha);

    if (!isMatch) {
      throw new EntityNotFoundException(MENSAGENS_GENERICAS.LOGIN_NAO_EXISTE);
    }

    usuario.senha = await this.hashingService.hash(changePassword.novaSenha);

    const result = await this.usuarioRepository
      .createQueryBuilder()
      .update(Usuario)
      .set({ senha: usuario.senha })
      .where('idUsuario = :idUsuario', { idUsuario: usuario.idUsuario })
      .execute();

    if (result.affected === 0) {
      throw new EntityNotFoundException(`${MENSAGENS_GENERICAS.NAO_ENCONTRADO} - ${changePassword.idUsuario}`);
    } else if (result.affected === 1) {
      return true;
    }
    return null;
  }
}
