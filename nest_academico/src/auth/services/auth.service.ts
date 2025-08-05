import { Injectable } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ConverterAuth } from '../dto/converter/auth.converter';
import { LoginResponse } from '../dto/response/login.response';
import { TokenHelperService } from './jwt.configuration.service';

@Injectable()
export class LoginService {
  constructor(private readonly tokenHelperService: TokenHelperService) {}

  async login(usuarioValidado: Usuario): Promise<LoginResponse | null> {
    const tokens = await this.tokenHelperService.createTokens(usuarioValidado);

    if (!tokens) {
      throw new JsonWebTokenError(MENSAGENS_GENERICAS.TOKEN_INVALIDO);
    }

    const auth = this.tokenHelperService.buildAuth(usuarioValidado, tokens);

    return auth ? ConverterAuth.toLoginResponse(auth) : null;
  }
}
