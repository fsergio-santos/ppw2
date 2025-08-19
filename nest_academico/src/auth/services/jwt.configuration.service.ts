import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { Auth } from 'src/auth/entities/auth.entity';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { EntityNotFoundException } from 'src/commons/exceptions/error/entity.exception';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Role } from '../../acesso/entities/role.entity';

@Injectable()
export class TokenHelperService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async createTokenUpdateData(usuario: Usuario, expiresDate: Date): Promise<string> {
    const timestamp = expiresDate?.getTime();
    if (!usuario || !usuario.idUsuario) {
      throw new EntityNotFoundException(MENSAGENS_GENERICAS.NAO_ENCONTRADO);
    }
    const authorizationToken = await this.signJwtAsync(usuario.idUsuario, timestamp, {
      email: usuario.email,
    });
    return authorizationToken;
  }

  async createTokens(usuario: Usuario) {
    if (!usuario || !usuario.idUsuario) {
      throw new EntityNotFoundException(MENSAGENS_GENERICAS.LOGIN_NAO_EXISTE);
    }

    const { idUsuario, nomeUsuario, email, roles } = usuario;

    const [accessToken, refreshToken] = await Promise.all([
      this.signJwtAsync(idUsuario, this.jwtConfiguration.jwtTTL, { nomeUsuario, email, roles }),
      this.signJwtAsync(idUsuario, this.jwtConfiguration.jwtRefreshTTL),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken<T extends object = any>(token: string): Promise<T> {
    try {
      const payload = await this.jwtService.verifyAsync<T>(token, this.jwtConfiguration);
      return payload;
    } catch (error: any) {
      throw new UnauthorizedException(error?.message || MENSAGENS_GENERICAS.TOKEN_INVALIDO);
    }
  }

  buildAuth(
    usuario: { email: string; nomeUsuario: string; roles: Role[] },
    tokens: { accessToken: string; refreshToken: string },
  ): Auth {
    const auth = new Auth();
    auth.email = usuario.email;
    auth.nome = usuario.nomeUsuario;
    auth.roles = usuario.roles;
    auth.accessToken = tokens.accessToken;
    auth.refreshToken = tokens.refreshToken;
    return auth;
  }

  private async signJwtAsync<T>(sub: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}
