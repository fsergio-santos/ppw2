import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from 'src/email/email.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import jwtConfig from './config/jwt.config';
import { LoginController } from './controller/auth.controller';
import { ChangePasswordController } from './controller/change.password.controller';
import { ForgotPasswordController } from './controller/forgot.password.controller';
import { LogoutController } from './controller/logout.controller';
import { ProfileController } from './controller/profile.controller';
import { RefreshTokenController } from './controller/refresh.token.controller';
import { RegisterUsuarioController } from './controller/register.usuario.controller';
import { BcryptService } from './hash/bcrypt.service';
import { HashingService } from './hash/hashing.service';
import { LoginService } from './services/auth.service';
import { ChangePasswordService } from './services/change.password.service';
import { ForgotPasswordService } from './services/forgot.password.service';
import { TokenHelperService } from './services/jwt.configuration.service';
import { RefreshTokenService } from './services/refresh.token.service';
import { RegisterUsuarioService } from './services/register.usuario.service';
import { ValidarUsuarioService } from './services/validar.usuario.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

const authControllers = [
  LoginController,
  RefreshTokenController,
  ChangePasswordController,
  RegisterUsuarioController,
  ForgotPasswordController,
  LogoutController,
  ProfileController,
];

const authServices = [
  LoginService,
  JwtStrategy,
  TokenHelperService,
  RefreshTokenService,
  ChangePasswordService,
  RegisterUsuarioService,
  ForgotPasswordService,
  ValidarUsuarioService,
  JwtStrategy,
  LocalStrategy,
];

@Module({
  imports: [
    forwardRef(() => UsuarioModule),
    ConfigModule.forFeature(jwtConfig),
    //TypeOrmModule.forFeature([Usuario]),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      useFactory: (config: ConfigType<typeof jwtConfig>) => ({
        secret: config.secret,
        signOptions: { expiresIn: config.jwtTTL },
        audience: config.audience,
        issuer: config.issuer,
        refresh: config.jwtRefreshTTL,
      }),
      inject: [jwtConfig.KEY],
    }),
    EmailModule,
    PassportModule,
    ConfigModule,
  ],
  controllers: [...authControllers],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    ...authServices,
  ],
  exports: [LoginService, PassportModule, HashingService, JwtModule],
})
export class AuthModule {}
