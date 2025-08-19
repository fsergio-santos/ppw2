import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { MENSAGENS_GENERICAS } from '../../commons/enum/mensagem.generica.enum';
import { UsuarioBloqueadoException } from '../../commons/exceptions/error/usuario.bloqueado';
import { STATUS_USUARIO } from '../../usuario/enum/status.usuario.enum';
import { UsuarioServiceFindOne } from '../../usuario/service/usuario.service.findone';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usuarioServiceFindOne: UsuarioServiceFindOne,
    readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    if (!jwtConfiguration.secret) {
      throw new Error('JWT_SECRET must be defined in environment variables or jwtConfig.');
    }

    super({
      jwtFromRequest: JwtStrategy.extractJwt,
      ignoreExpiration: false,
      secretOrKey: jwtConfiguration.secret,
      audience: jwtConfiguration.audience,
      issuer: jwtConfiguration.issuer,
    });
  }

  private static extractJwt(req: Request): string | null {
    if (req?.cookies?.['accessToken']) {
      return req.cookies['accessToken'];
    }

    const authHeader = req.headers?.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }

    return null;
  }

  async validate(payload: any) {
    const usuario = await this.usuarioServiceFindOne.findById(payload.sub);

    if (!usuario) {
      throw new UnauthorizedException(MENSAGENS_GENERICAS.NAO_ENCONTRADO);
    }

    if (usuario.ativo === STATUS_USUARIO.BLOQUEADO) {
      throw new UsuarioBloqueadoException(MENSAGENS_GENERICAS.ACESSO_PROIBIDO);
    }

    return {
      ...usuario,
      roles: usuario.roles,
    };
  }
}
