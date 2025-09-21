import { plainToInstance } from 'class-transformer';
import { STATUS_USUARIO } from 'src/usuario/enum/status.usuario.enum';
import { Usuario } from '../../entities/usuario.entity';
import { UsuarioRequest } from '../request/usuario.request';
import { UsuarioResponse } from '../response/usuario.response';

export class ConverterUsuario {
  static toUsuario(usuarioRequest: UsuarioRequest): Usuario {
    const usuario = new Usuario();
    if (usuarioRequest.idUsuario != null) {
      usuario.idUsuario = usuarioRequest.idUsuario;
    }
    usuario.codUsuario = usuarioRequest.codUsuario ?? '';
    usuario.nomeUsuario = usuarioRequest.nomeUsuario ?? '';
    usuario.email = usuarioRequest.email ?? '';
    usuario.foto = usuarioRequest.foto ?? '';
    usuario.tipo = usuarioRequest.tipo;
    usuario.ativo = STATUS_USUARIO.BLOQUEADO;

    return usuario;
  }

  static toListUsuarioResponse(
    listaUsuario: Array<Usuario> = [],
  ): UsuarioResponse[] {
    return plainToInstance(UsuarioResponse, listaUsuario, {
      excludeExtraneousValues: true,
    });
  }

  static toUsuarioResponse(usuario: Usuario): UsuarioResponse {
    return plainToInstance(UsuarioResponse, usuario, {
      excludeExtraneousValues: true,
    });
  }
}
