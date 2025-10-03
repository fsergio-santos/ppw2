import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { ApiListDoc } from '../../commons/decorators/swagger.decorators';
import { USUARIO } from '../constants/usuario.constants';
import { UsuarioResponse } from '../dto/response/usuario.response';
import { UsuarioServiceFindAll } from '../service/usuario.service.findall';

@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerFindAll {
  constructor(private readonly usuarioService: UsuarioServiceFindAll) {}

  @Get(ROTA.USUARIO.LISTAR)
  @ApiListDoc(USUARIO.OPERACAO.LISTAR, UsuarioResponse)
  async findAll(@Req() req: Request): Promise<Result<UsuarioResponse[]>> {
    const response = await this.usuarioService.findAll();
    return MensagemSistema.showMensagem(HttpStatus.OK, USUARIO.OPERACAO.LISTAR.SUCESSO, response, req.path, null);
  }
}
