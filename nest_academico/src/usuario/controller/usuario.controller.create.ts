import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceCreate } from '../service/usuario.service.create';

@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerCreate {
  constructor(private readonly usuarioService: UsuarioServiceCreate) {}

  @Post(ROTA.USUARIO.CRIAR)
  @ApiOperation({ summary: MENSAGEM.USUARIO.OPERACAO_CRIAR })
  @ApiParam({
    name: 'UsuarioRequest',
    description: MENSAGEM.USUARIO.OPERACAO_CRIAR,
    required: true,
    type: UsuarioRequest,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: MENSAGEM.USUARIO.CRIAR,
    type: UsuarioResponse,
  })
  @ApiConsumes(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiBody({ type: UsuarioRequest })
  async create(@Body() usuarioRequest: UsuarioRequest, @Req() req: Request): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioService.create(usuarioRequest);
    return MensagemSistema.showMensagem(HttpStatus.CREATED, MENSAGEM.USUARIO.CRIAR, response, req.path, null);
  }
}
