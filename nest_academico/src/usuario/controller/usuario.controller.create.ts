import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { ApiPostDoc } from '../../commons/decorators/swagger.decorators';
import { USUARIO } from '../constants/usuario.constants';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceCreate } from '../service/usuario.service.create';

@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerCreate {
  constructor(private readonly usuarioService: UsuarioServiceCreate) {}

  @Post(ROTA.USUARIO.CRIAR)
  @ApiPostDoc(USUARIO.OPERACAO.CRIAR, UsuarioRequest, UsuarioResponse)
  async create(@Body() usuarioRequest: UsuarioRequest, @Req() req: Request): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioService.create(usuarioRequest);
    return MensagemSistema.showMensagem(HttpStatus.CREATED, USUARIO.OPERACAO.CRIAR.SUCESSO, response, req.path, null);
  }
}
