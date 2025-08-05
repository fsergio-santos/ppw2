import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { ValidarUsuarioService } from '../services/validar.usuario.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private validateUsuarioService: ValidarUsuarioService) {
    super({
      usernameField: 'email',
      passwordField: 'senha',
    });
  }

  async validate(email: string, senha: string): Promise<any> {
    const usuario = await this.validateUsuarioService.validateUser(email, senha); // Lógica de validação no AuthService

    if (!usuario) {
      throw new UnauthorizedException(MENSAGENS_GENERICAS.LOGIN_NAO_EXISTE);
    }
    return usuario;
  }
}
