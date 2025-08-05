import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { UsuarioServiceFindOne } from 'src/usuario/service/usuario.service.findone';
import { ConverterAuth } from '../dto/converter/auth.converter';
import { RefreshTokenRequest } from '../dto/request/refresh.token.request';
import { LoginResponse } from '../dto/response/login.response';
import { TokenHelperService } from './jwt.configuration.service';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly usuarioServiceFindOne: UsuarioServiceFindOne,
    private readonly tokenHelperService: TokenHelperService,
  ) {}

  async refreshTokens(refreshTokenRequest: RefreshTokenRequest): Promise<LoginResponse | null> {
    try {
      const { sub } = await this.tokenHelperService.verifyToken(refreshTokenRequest.refreshToken);

      const usuario = await this.usuarioServiceFindOne.findById(sub);

      if (!usuario) {
        throw new EntityNotFoundException(MENSAGENS_GENERICAS.LOGIN_NAO_EXISTE);
      }

      const tokens = await this.tokenHelperService.createTokens(usuario);

      if (!tokens) {
        throw new JsonWebTokenError('Erro ao gerar o token ');
      }

      const auth = this.tokenHelperService.buildAuth(usuario, tokens);

      return auth ? ConverterAuth.toLoginResponse(auth) : null;
    } catch (error: any) {
      throw new UnauthorizedException(error?.message || MENSAGENS_GENERICAS.TOKEN_INVALIDO);
    }
  }
}
