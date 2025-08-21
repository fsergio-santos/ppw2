import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from '../config/jwt.config';

import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { UsuarioBloqueadoException } from 'src/commons/exceptions/error/usuario.bloqueado';
import { STATUS_USUARIO } from 'src/usuario/enum/status.usuario.enum';
import { UsuarioServiceFindOne } from 'src/usuario/service/usuario.service.findone';
import { ExtendedRequest, REQUEST_TOKEN_PAYLOAD_KEY } from '../constants/auth.constants';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly usuarioServiceFindOne: UsuarioServiceFindOne,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    if (!this.jwtConfiguration.secret) {
      throw new Error('JWT_SECRET must be defined in environment variables or jwtConfig.');
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ExtendedRequest = context.switchToHttp().getRequest();

    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException(MENSAGENS_GENERICAS.ACESSO_PROIBIDO);
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      //const payload = await this.jwtService.verifyAsync(token, this.jwtConfiguration);

      const usuario = await this.usuarioServiceFindOne.findById(payload.sub);

      if (!usuario) {
        throw new UnauthorizedException(MENSAGENS_GENERICAS.NAO_ENCONTRADO);
      }

      if (usuario.ativo === STATUS_USUARIO.BLOQUEADO) {
        throw new UsuarioBloqueadoException(MENSAGENS_GENERICAS.ACESSO_PROIBIDO);
      }

      payload['usuario'] = usuario;

      request[REQUEST_TOKEN_PAYLOAD_KEY] = payload;
    } catch (error: any) {
      throw new UnauthorizedException(error.message || MENSAGENS_GENERICAS.TOKEN_INVALIDO);
    }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    if (request.cookies && request.cookies['accessToken']) {
      return request.cookies['accessToken'];
    }

    const authorization = request.headers?.authorization;

    if (!authorization || typeof authorization !== 'string') {
      throw new UnauthorizedException(MENSAGENS_GENERICAS.TOKEN_INVALIDO);
    }

    if (authorization && typeof authorization === 'string' && authorization.startsWith('Bearer ')) {
      return authorization.split(' ')[1];
    }

    return undefined;
  }
}
