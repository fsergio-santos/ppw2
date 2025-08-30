import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA_AUTH } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Public } from '../decorator/public.decorator';
import { LoginRequest } from '../dto/request/auth.request';
import { LoginResponse } from '../dto/response/login.response';
import { LocalAuthGuard } from '../guard/local.auth.guard';
import { LoginService } from '../services/auth.service';

@UseGuards(LocalAuthGuard)
@ApiTags(SHOW_ENTITY.AUTH)
@Controller(ROTA_AUTH.BASE)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Public()
  @Post(ROTA_AUTH.LOGIN)
  @ApiOperation({ summary: MENSAGEM.USUARIO.LOGIN })
  @ApiParam({
    name: 'LoginRequest',
    description: MENSAGEM.USUARIO.LOGIN,
    required: true,
    type: LoginRequest,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.USUARIO.LOGIN,
    type: LoginResponse,
  })
  @ApiConsumes(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const usuario = req.user as Usuario;

    const response = await this.loginService.login(usuario);

    if (response) {
      res.cookie('accessToken', response.accessToken, {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === 'production' ||
          process.env.NODE_ENV === 'development',
        sameSite: 'lax',
        maxAge: response.expiresIn * 1000,
      });

      res.cookie('refreshToken', response.refreshToken, {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === 'production' ||
          process.env.NODE_ENV === 'development',
        sameSite: 'lax',
        maxAge: response.refreshExpiresIn * 1000,
      });
    }
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      null,
      response,
      req.path,
      null,
    );
  }
}
