import {
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Req,
} from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceUpdate } from '../service/usuario.service.update';

@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerUpdate {
  constructor(private readonly usuarioService: UsuarioServiceUpdate) {}

  @Put(ROTA.USUARIO.ATUALIZAR)
  @ApiOperation({ summary: MENSAGEM.USUARIO.OPERACAO_ATUALIZAR })
  @ApiParam({
    name: 'UsuarioRequest',
    description: 'Dados do usuário a ser atualizado',
    required: true,
    type: UsuarioRequest,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.USUARIO.ATUALIZAR,
    type: UsuarioResponse,
  })
  @ApiConsumes(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiBody({ type: UsuarioRequest })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuarioRequest: UsuarioRequest,
    @Req() req: Request,
    //@TokenPayloadParam() tokenPaylod: TokenPayloadDto,
  ): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioService.updatePut(id, usuarioRequest);
    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      MENSAGEM.USUARIO.ATUALIZAR,
      response,
      req.path,
      null,
    );
  }
}
