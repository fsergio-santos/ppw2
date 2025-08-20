import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA_AUTH } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { RefreshTokenRequest } from '../dto/request/refresh.token.request';
import { RefreshTokenService } from '../services/refresh.token.service';

@ApiTags(SHOW_ENTITY.AUTH)
@Controller(ROTA_AUTH.BASE)
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post(ROTA_AUTH.REFRESH_TOKEN)
  @ApiOperation({ summary: MENSAGEM.USUARIO.ATUALIZAR })
  @ApiParam({
    name: 'RefreshTokenRequest',
    description: MENSAGEM.USUARIO.ATUALIZAR,
    required: true,
    type: RefreshTokenRequest,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGENS_GENERICAS.REFRESH_TOKEN,
    type: MensagemSistema,
  })
  @ApiConsumes(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async login(@Body() refreshTokenService: RefreshTokenRequest, @Req() res: Request) {
    const response = await this.refreshTokenService.refreshTokens(refreshTokenService);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGENS_GENERICAS.REFRESH_TOKEN, response, res.path, null);
  }
}
