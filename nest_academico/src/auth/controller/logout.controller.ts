import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA_AUTH } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

@ApiTags(SHOW_ENTITY.AUTH)
@Controller(ROTA_AUTH.BASE)
export class LogoutController {
  @Post(ROTA_AUTH.LOGOUT)
  @ApiOperation({ summary: MENSAGEM.USUARIO.LOGOUT })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.USUARIO.LOGOUT,
    type: MensagemSistema,
  })
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development',
      sameSite: 'lax',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development',
      sameSite: 'lax',
    });
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGENS_GENERICAS.LOGOUT_EFETUADO, null, req.path, null);
  }
}
