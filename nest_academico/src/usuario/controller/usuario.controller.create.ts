import { Body, Controller, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthTokenGuard } from 'src/auth/guard/auth.token.guard';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
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
    name: 'usuarioRequest',
    description: 'Dados do usuário a ser criado',
    required: true,
    type: UsuarioRequest,
  })
  @ApiResponse({
    status: 201,
    description: MENSAGEM.USUARIO.CRIAR,
    type: UsuarioResponse,
  })
  @ApiResponse({ status: 400, description: MENSAGENS_GENERICAS.DADOS_INVALIDOS })
  async create(@Body() usuarioRequest: UsuarioRequest, @Req() req: Request): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioService.create(usuarioRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.USUARIO.CRIAR, response, req.path, null);
  }
}
