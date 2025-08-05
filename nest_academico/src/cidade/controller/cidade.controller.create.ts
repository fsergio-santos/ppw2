import { Controller, Post, Body, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';
import { ApiTags } from '@nestjs/swagger';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { CidadeServiceCreate } from '../service/cidade.service.create';
import { CidadeResponse } from '../dto/response/cidade.response';
import { CidadeRequest } from '../dto/request/cidade.request';
import { AuthTokenGuard } from 'src/auth/guard/auth.token.guard';

@UseGuards(AuthTokenGuard)
@ApiTags(SHOW_ENTITY.CIDADE)
@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerCreate {
  constructor(private readonly cidadeService: CidadeServiceCreate) {}

  @Post(ROTA.CIDADE.CRIAR)
  @ApiRespostaPadrao(CidadeResponse, false, MENSAGEM.CIDADE.CRIAR)
  async create(@Body() cidadeRequest: CidadeRequest, @Req() res: Request): Promise<Result<CidadeResponse>> {
    const response = await this.cidadeService.create(cidadeRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.CIDADE.CRIAR, response, res.path, null);
  }
}
