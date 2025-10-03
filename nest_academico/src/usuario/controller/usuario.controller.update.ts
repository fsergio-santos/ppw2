import { Body, Controller, HttpStatus, Param, ParseIntPipe, Put, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { ApiPutDoc } from '../../commons/decorators/swagger.decorators';
import { USUARIO } from '../constants/usuario.constants';
import { UsuarioRequest } from '../dto/request/usuario.request';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceUpdate } from '../service/usuario.service.update';

@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerUpdate {
  constructor(private readonly usuarioService: UsuarioServiceUpdate) {}

  @Put(ROTA.USUARIO.ATUALIZAR)
  @ApiPutDoc(USUARIO.OPERACAO.ATUALIZAR, UsuarioRequest, UsuarioResponse)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuarioRequest: UsuarioRequest,
    @Req() req: Request,
    //@TokenPayloadParam() tokenPaylod: TokenPayloadDto,
  ): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioService.updatePut(id, usuarioRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, USUARIO.OPERACAO.ATUALIZAR.SUCESSO, response, req.path, null);
  }
}
