import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { UsuarioServiceFindAll } from '../service/usuario.service.findall';
import { UsuarioResponse } from '../dto/response/usuario.response';

@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerFindAll {
  constructor(private readonly usuarioService: UsuarioServiceFindAll) {}

  @Get(ROTA.USUARIO.LISTAR)
  @ApiRespostaPadrao(UsuarioResponse, true, MENSAGEM.USUARIO.LISTAR)
  async findAll(@Req() req: Request): Promise<Result<UsuarioResponse[]>> {
    const response = await this.usuarioService.findAll();
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.USUARIO.LISTAR, response, req.path, null);
  }
}
