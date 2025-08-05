import { Controller, Body, HttpStatus, Put, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';
import { ApiTags } from '@nestjs/swagger';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { UsuarioServiceUpdate } from '../service/usuario.service.update';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { AuthTokenGuard } from 'src/auth/guard/auth.token.guard';
import { TokenPayloadDto } from 'src/auth/dto/token.payload';
import { TokenPayloadParam } from 'src/auth/params/token.payload.param';

@UseGuards(AuthTokenGuard)
@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerUpdate {
  constructor(private readonly usuarioService: UsuarioServiceUpdate) {}

  @Put(ROTA.USUARIO.ATUALIZAR)
  @ApiRespostaPadrao(UsuarioResponse, false, MENSAGEM.USUARIO.ATUALIZAR)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuarioRequest: UsuarioRequest,
    @Req() req: Request,
    @TokenPayloadParam() tokenPaylod: TokenPayloadDto,
  ): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioService.updatePut(id, usuarioRequest, tokenPaylod);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.USUARIO.ATUALIZAR, response, req.path, null);
  }
}
