import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';

import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { DepartamentoResponse } from '../dto/response/departamento.response';
import { DepartamentoServiceFindAll } from '../services/departamento.service.findall';

@ApiTags(SHOW_ENTITY.DEPARTAMENTO)
@Controller(ROTA.DEPARTAMENTO.BASE)
export class DepartamentoControllerFindAll {
  constructor(private readonly departamentoService: DepartamentoServiceFindAll) {}

  @Get(ROTA.DEPARTAMENTO.LISTAR)
  @ApiOperation({ summary: MENSAGEM.DEPARTAMENTO.OPERACAO_LISTAR })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.DEPARTAMENTO.LISTAR,
    type: DepartamentoResponse,
  })
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async findAll(@Req() req: Request): Promise<Result<DepartamentoResponse[]>> {
    const response = await this.departamentoService.findAll();
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.DEPARTAMENTO.LISTAR, response, req.path, null);
  }
}
