import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingService } from 'src/auth/hash/hashing.service';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { STATUS_USUARIO } from 'src/usuario/enum/status.usuario.enum';
import { UsuarioServiceFindEmail } from 'src/usuario/service/usuario.service.findemail';

@Injectable()
export class ValidarUsuarioService {
  constructor(
    private readonly usuarioServiceFindEmail: UsuarioServiceFindEmail,
    private readonly hashingService: HashingService,
  ) {}

  async validateUser(email: string, senha: string): Promise<Usuario> {
    const usuario = await this.usuarioServiceFindEmail.findByEmail(email);

    if (!usuario) {
      throw new UnauthorizedException(MENSAGENS_GENERICAS.LOGIN_NAO_EXISTE);
    }

    if (usuario.ativo === STATUS_USUARIO.BLOQUEADO) {
      throw new UnauthorizedException(MENSAGENS_GENERICAS.ACESSO_PROIBIDO);
    }

    const isPasswordValid = await this.hashingService.compare(senha, usuario.senha);

    if (!isPasswordValid) {
      throw new UnauthorizedException(MENSAGENS_GENERICAS.LOGIN_NAO_EXISTE); // Mensagem genérica para segurança
    }

    // Retorna o usuário sem a senha (importante para não expor a senha no `req.user`)
    const { senha: _, ...result } = usuario;
    return result as Usuario;
  }
}
