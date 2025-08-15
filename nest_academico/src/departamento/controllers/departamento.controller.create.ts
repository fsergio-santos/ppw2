import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { DepartamentoRequest } from '../dto/request/departamento.request';
import { DepartamentoResponse } from '../dto/response/departamento.response';
import { DepartamentoServiceCreate } from '../services/departamento.service.create';

@ApiTags(SHOW_ENTITY.DEPARTAMENTO)
@Controller(ROTA.DEPARTAMENTO.BASE)
export class DepartamentoControllerCreate {
  constructor(private readonly DepartamentoService: DepartamentoServiceCreate) {}

  @Post(ROTA.DEPARTAMENTO.CRIAR)
  @ApiOperation({ summary: MENSAGEM.DEPARTAMENTO.OPERACAO_CRIAR })
  @ApiParam({
    name: 'DepartamentoRequest',
    description: MENSAGEM.DEPARTAMENTO.OPERACAO_CRIAR,
    required: true,
    type: DepartamentoRequest,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: MENSAGEM.DEPARTAMENTO.CRIAR,
    type: DepartamentoResponse,
  })
  @ApiConsumes(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async create(
    @Body() DepartamentoRequest: DepartamentoRequest,
    @Req() req: Request,
  ): Promise<Result<DepartamentoResponse>> {
    const response = await this.DepartamentoService.create(DepartamentoRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.DEPARTAMENTO.CRIAR, response, req.path, null);
  }
}
