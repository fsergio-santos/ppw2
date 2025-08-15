import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { RefreshTokenRequest } from '../dto/request/refresh.token.request';
import { RefreshTokenService } from '../services/refresh.token.service';

@ApiTags(SHOW_ENTITY.AUTH)
@Controller(ROTA.AUTH.BASE)
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post(ROTA.AUTH.REFRESH_TOKEN)
  @ApiRespostaPadrao(RefreshTokenRequest, false, MENSAGENS_GENERICAS.REFRESH_TOKEN)
  async login(@Body() refreshTokenService: RefreshTokenRequest, @Req() res: Request) {
    const response = await this.refreshTokenService.refreshTokens(refreshTokenService);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGENS_GENERICAS.REFRESH_TOKEN, response, res.path, null);
  }
}
