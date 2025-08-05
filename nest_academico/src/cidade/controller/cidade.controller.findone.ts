import { Controller, Get, HttpStatus, Req, Param, ParseIntPipe } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';
import { ApiTags } from '@nestjs/swagger';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { CidadeServiceFindOne } from '../service/cidade.service.findone';
import { CidadeResponse } from '../dto/response/cidade.response';

@ApiTags(SHOW_ENTITY.CIDADE)
@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerFindOne {
  constructor(private readonly cidadeService: CidadeServiceFindOne) {}

  @Get(ROTA.CIDADE.POR_ID)
  @ApiRespostaPadrao(CidadeResponse, false, MENSAGEM.CIDADE.POR_ID)
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() res: Request): Promise<Result<CidadeResponse>> {
    const response = await this.cidadeService.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.CIDADE.POR_ID, response, res.path, null);
  }
}
