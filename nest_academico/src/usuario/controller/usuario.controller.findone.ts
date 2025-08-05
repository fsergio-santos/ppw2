import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';
import { ApiTags } from '@nestjs/swagger';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { UsuarioServiceFindOne } from '../service/usuario.service.findone';
import { UsuarioResponse } from '../dto/response/usuario.response';

@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerFindOne {
  constructor(private readonly usuarioService: UsuarioServiceFindOne) {}

  @ApiRespostaPadrao(UsuarioResponse, false, MENSAGEM.USUARIO.POR_ID)
  @Get(ROTA.USUARIO.POR_ID)
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioService.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.USUARIO.POR_ID, response, req.path, null);
  }
}
