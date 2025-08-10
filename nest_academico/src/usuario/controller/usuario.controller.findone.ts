import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceFindOne } from '../service/usuario.service.findone';

@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerFindOne {
  constructor(private readonly usuarioService: UsuarioServiceFindOne) {}

  @Get(ROTA.USUARIO.POR_ID)
  @ApiOperation({ summary: MENSAGEM.USUARIO.OPERACAO_POR_ID })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.USUARIO.POR_ID,
    type: UsuarioResponse,
  })
  @ApiParam({
    name: 'id',
    description: MENSAGENS_GENERICAS.IDENTIFICADOR_UNICO,
    required: true,
    type: 'número',
  })
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioService.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.USUARIO.POR_ID, response, req.path, null);
  }
}
