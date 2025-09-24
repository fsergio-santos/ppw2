import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';

import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { ApiGetDoc } from '../../commons/decorators/swagger.decorators';
import { CIDADE } from '../constants/cidade.constants';
import { CidadeResponse } from '../dto/response/cidade.response';
import { CidadeServiceFindOne } from '../service/cidade.service.findone';

@ApiTags(SHOW_ENTITY.CIDADE)
@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerFindOne {
  constructor(private readonly cidadeService: CidadeServiceFindOne) {}

  @Get(ROTA.CIDADE.POR_ID)
  @ApiGetDoc(CIDADE.OPERACAO.POR_ID, CidadeResponse)
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() res: Request): Promise<Result<CidadeResponse>> {
    const response = await this.cidadeService.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, CIDADE.OPERACAO.POR_ID.SUCESSO, response, res.path, null);
  }
}
