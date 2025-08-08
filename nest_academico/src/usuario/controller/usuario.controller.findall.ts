import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceFindAll } from '../service/usuario.service.findall';

@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerFindAll {
  constructor(private readonly usuarioService: UsuarioServiceFindAll) {}

  @Get(ROTA.USUARIO.LISTAR)
  @ApiOperation({ summary: 'Listar todos os usuários cadastrados no sistema ' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.USUARIO.LISTAR,
    type: UsuarioResponse,
  })
  @ApiProduces('application/json')
  async findAll(@Req() req: Request): Promise<Result<UsuarioResponse[]>> {
    const response = await this.usuarioService.findAll();
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.USUARIO.LISTAR, response, req.path, null);
  }
}
