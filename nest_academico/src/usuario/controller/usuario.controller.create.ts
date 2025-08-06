import { Body, Controller, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthTokenGuard } from 'src/auth/guard/auth.token.guard';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceCreate } from '../service/usuario.service.create';

@UseGuards(AuthTokenGuard)
@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerCreate {
  constructor(private readonly usuarioService: UsuarioServiceCreate) {}

  @Post(ROTA.USUARIO.CRIAR)
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiParam({
    name: 'UsuarioRequest',
    description: 'Dados do usuário a ser criado',
    required: true,
    type: UsuarioRequest,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: MENSAGEM.USUARIO.CRIAR,
    type: UsuarioResponse,
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(@Body() usuarioRequest: UsuarioRequest, @Req() req: Request): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioService.create(usuarioRequest);
    return MensagemSistema.showMensagem(HttpStatus.CREATED, MENSAGEM.USUARIO.CRIAR, response, req.path, null);
  }
}
