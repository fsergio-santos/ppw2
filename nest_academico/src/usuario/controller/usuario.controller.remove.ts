import { Controller, HttpStatus, Delete, Param, ParseIntPipe, Req } from '@nestjs/common';

import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';

import { ApiTags } from '@nestjs/swagger';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { UsuarioServiceRemove } from '../service/usuario.service.remove';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { TokenPayloadParam } from 'src/auth/params/token.payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token.payload';

@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerRemove {
  constructor(private readonly usuarioService: UsuarioServiceRemove) {}

  @Delete(ROTA.USUARIO.EXCLUIR)
  @ApiRespostaPadrao(UsuarioResponse, false, MENSAGEM.USUARIO.EXCLUIR)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ): Promise<Result<void>> {
    await this.usuarioService.remove(id, tokenPayload);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.USUARIO.EXCLUIR, null, req.path, null);
  }
}
