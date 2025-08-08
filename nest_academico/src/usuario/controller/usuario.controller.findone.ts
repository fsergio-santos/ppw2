import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceFindOne } from '../service/usuario.service.findone';

@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerFindOne {
  constructor(private readonly usuarioService: UsuarioServiceFindOne) {}

  @Get(ROTA.USUARIO.POR_ID)
  @ApiOperation({ summary: 'Mosta os dados do usuário por identificação  ' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.USUARIO.POR_ID,
    type: UsuarioResponse,
  })
  @ApiProduces('application/json')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioService.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.USUARIO.POR_ID, response, req.path, null);
  }
}
