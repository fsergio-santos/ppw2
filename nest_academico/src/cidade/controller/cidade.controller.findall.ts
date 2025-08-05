import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';
import { ApiTags } from '@nestjs/swagger';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { CidadeResponse } from '../dto/response/cidade.response';
import { CidadeServiceFindAll } from '../service/cidade.service.findall';

@ApiTags(SHOW_ENTITY.CIDADE)
@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerFindAll {
  constructor(private readonly cidadeService: CidadeServiceFindAll) {}

  @Get(ROTA.CIDADE.LISTAR)
  @ApiRespostaPadrao(CidadeResponse, true, MENSAGEM.CIDADE.LISTAR)
  async findAll(@Req() res: Request): Promise<Result<CidadeResponse[]>> {
    const response = await this.cidadeService.findAll();
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.CIDADE.LISTAR, response, res.path, null);
  }
}
