import { Body, Controller, HttpStatus, Param, ParseIntPipe, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { ApiPutDoc } from '../../commons/decorators/swagger.decorators';
import { CIDADE } from '../constants/cidade.constants';
import { CidadeRequest } from '../dto/request/cidade.request';
import { CidadeResponse } from '../dto/response/cidade.response';
import { CidadeServiceUpdate } from '../service/cidade.service.update';

@ApiTags(SHOW_ENTITY.CIDADE)
@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerUpdate {
  constructor(private readonly cidadeService: CidadeServiceUpdate) {}

  @Put(ROTA.CIDADE.ATUALIZAR)
  @ApiPutDoc(CIDADE.OPERACAO.ATUALIZAR, CidadeRequest, CidadeResponse)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() cidadeRequest: CidadeRequest,
    @Req() res: Request,
  ): Promise<Result<CidadeResponse>> {
    const response = await this.cidadeService.updatePut(id, cidadeRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, CIDADE.OPERACAO.ATUALIZAR.SUCESSO, response, res.path, null);
  }
}
