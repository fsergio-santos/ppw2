import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { CidadeRequest } from '../dto/request/cidade.request';
import { CidadeResponse } from '../dto/response/cidade.response';
import { CidadeServiceCreate } from '../service/cidade.service.create';

@ApiTags(SHOW_ENTITY.CIDADE)
@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerCreate {
  constructor(private readonly cidadeService: CidadeServiceCreate) {}

  @Post(ROTA.CIDADE.CRIAR)
  @ApiOperation({ summary: MENSAGEM.CIDADE.OPERACAO_CRIAR })
  @ApiParam({
    name: 'CidadeRequest',
    description: MENSAGEM.CIDADE.OPERACAO_CRIAR,
    required: true,
    type: CidadeRequest,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: MENSAGEM.CIDADE.CRIAR,
    type: CidadeResponse,
  })
  @ApiConsumes(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async create(@Body() cidadeRequest: CidadeRequest, @Req() res: Request): Promise<Result<CidadeResponse>> {
    const response = await this.cidadeService.create(cidadeRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.CIDADE.CRIAR, response, res.path, null);
  }
}
