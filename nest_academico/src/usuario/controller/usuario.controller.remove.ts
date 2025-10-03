import { Controller, Delete, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';

import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';

import { ApiTags } from '@nestjs/swagger';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { ApiDeleteDoc } from '../../commons/decorators/swagger.decorators';
import { USUARIO } from '../constants/usuario.constants';
import { UsuarioServiceRemove } from '../service/usuario.service.remove';

@ApiTags(SHOW_ENTITY.USUARIO)
@Controller(ROTA.USUARIO.BASE)
export class UsuarioControllerRemove {
  constructor(private readonly usuarioService: UsuarioServiceRemove) {}

  @Delete(ROTA.USUARIO.EXCLUIR)
  @ApiDeleteDoc(USUARIO.OPERACAO.EXCLUIR)
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<void>> {
    await this.usuarioService.remove(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, USUARIO.OPERACAO.EXCLUIR.SUCESSO, null, req.path, null);
  }
}
