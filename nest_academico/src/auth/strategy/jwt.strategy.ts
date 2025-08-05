import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config'; //
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioServiceFindOne } from 'src/usuario/service/usuario.service.findone';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly jwtConfiguration: ConfigType<typeof jwtConfig>, // Injeta a configuração JWT
    private readonly usuarioServiceFindOne: UsuarioServiceFindOne,
  ) {
    if (!jwtConfiguration.secret) {
      throw new Error('JWT_SECRET must be defined in environment variables or jwtConfig.');
    }
    super({
      // 1. Onde o JWT será extraído: do cookie 'accessToken'
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['accessToken']; // Acessa o cookie 'accessToken'
          }
          return token;
        },
      ]),
      ignoreExpiration: false, // Não ignora a expiração do token
      secretOrKey: jwtConfiguration.secret, // Usa o segredo da sua configuração
    });
  }

  // 2. Método de validação do payload do token
  async validate(payload: any) {
    // payload.sub conterá o idUsuario que você definiu no signJwtAsync
    const usuario = await this.usuarioServiceFindOne.findById(payload.sub); // Buscar usuário por ID

    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado ou token inválido.');
    }

    // Retorna o usuário. Ele será anexado ao `req.user` nos controladores protegidos.
    return usuario;
  }
}
