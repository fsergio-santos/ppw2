import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { ApiGetDoc } from '../../commons/decorators/swagger.decorators';
import { USUARIO } from '../constants/usuario.constants';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceFindOne } from '../service/usuario.service.findone';

@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerFindOne {
  constructor(private readonly usuarioService: UsuarioServiceFindOne) {}

  @Get(ROTA.USUARIO.POR_ID)
  @ApiGetDoc(USUARIO.OPERACAO.POR_ID, UsuarioResponse)
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<UsuarioResponse>> {
    const response = await this.usuarioService.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, USUARIO.OPERACAO.POR_ID.SUCESSO, response, req.path, null);
  }
}
