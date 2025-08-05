import { Controller, Body, HttpStatus, Req, Put, Param, ParseIntPipe } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';
import { ApiTags } from '@nestjs/swagger';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { CidadeServiceUpdate } from '../service/cidade.service.update';
import { CidadeResponse } from '../dto/response/cidade.response';
import { CidadeRequest } from '../dto/request/cidade.request';

@ApiTags(SHOW_ENTITY.CIDADE)
@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerUpdate {
  constructor(private readonly cidadeService: CidadeServiceUpdate) {}

  @Put(ROTA.CIDADE.ATUALIZAR)
  @ApiRespostaPadrao(CidadeResponse, false, MENSAGEM.CIDADE.ATUALIZAR)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() cidadeRequest: CidadeRequest,
    @Req() res: Request,
  ): Promise<Result<CidadeResponse>> {
    const response = await this.cidadeService.updatePut(id, cidadeRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.CIDADE.ATUALIZAR, response, res.path, null);
  }
}
