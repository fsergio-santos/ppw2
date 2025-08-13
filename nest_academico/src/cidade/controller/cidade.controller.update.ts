import { Body, Controller, HttpStatus, Param, ParseIntPipe, Put, Req } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { CidadeRequest } from '../dto/request/cidade.request';
import { CidadeResponse } from '../dto/response/cidade.response';
import { CidadeServiceUpdate } from '../service/cidade.service.update';

@ApiTags(SHOW_ENTITY.CIDADE)
@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerUpdate {
  constructor(private readonly cidadeService: CidadeServiceUpdate) {}

  @Put(ROTA.CIDADE.ATUALIZAR)
  @ApiOperation({ summary: MENSAGEM.CIDADE.OPERACAO_ATUALIZAR })
  @ApiParam({
    name: 'CidadeRequest',
    description: MENSAGEM.CIDADE.OPERACAO_ATUALIZAR,
    required: true,
    type: CidadeRequest,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.CIDADE.ATUALIZAR,
    type: CidadeResponse,
  })
  @ApiConsumes(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() cidadeRequest: CidadeRequest,
    @Req() res: Request,
  ): Promise<Result<CidadeResponse>> {
    const response = await this.cidadeService.updatePut(id, cidadeRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.CIDADE.ATUALIZAR, response, res.path, null);
  }
}
