import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';

import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { CidadeResponse } from '../dto/response/cidade.response';
import { CidadeServiceFindOne } from '../service/cidade.service.findone';

@ApiTags(SHOW_ENTITY.CIDADE)
@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerFindOne {
  constructor(private readonly cidadeService: CidadeServiceFindOne) {}

  @Get(ROTA.CIDADE.POR_ID)
  @ApiOperation({ summary: MENSAGEM.CIDADE.OPERACAO_POR_ID })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.CIDADE.POR_ID,
    type: CidadeResponse,
  })
  @ApiParam({
    name: 'id',
    description: MENSAGENS_GENERICAS.IDENTIFICADOR_UNICO,
    required: true,
    type: 'número',
  })
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() res: Request): Promise<Result<CidadeResponse>> {
    const response = await this.cidadeService.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.CIDADE.POR_ID, response, res.path, null);
  }
}
