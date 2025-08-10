import { Controller, Delete, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';

import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';

import { ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenPayloadDto } from 'src/auth/dto/token.payload';
import { TokenPayloadParam } from 'src/auth/params/token.payload.param';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { UsuarioServiceRemove } from '../service/usuario.service.remove';

@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerRemove {
  constructor(private readonly usuarioService: UsuarioServiceRemove) {}

  @Delete(ROTA.USUARIO.EXCLUIR)
  @ApiOperation({ summary: MENSAGEM.USUARIO.OPERACAO_POR_ID })
  @ApiParam({
    name: 'id',
    description: MENSAGENS_GENERICAS.IDENTIFICADOR_UNICO,
    required: true,
    type: 'número',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.USUARIO.EXCLUIR,
  })
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ): Promise<Result<void>> {
    await this.usuarioService.remove(id, tokenPayload);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.USUARIO.EXCLUIR, null, req.path, null);
  }
}
