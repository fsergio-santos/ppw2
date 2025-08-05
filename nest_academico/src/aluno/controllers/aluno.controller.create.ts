import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { Result } from 'src/commons/response/mensagem';
import { AlunoRequest } from '../dto/request/alunto.request';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceCreate } from '../service/aluno.service.create';

@ApiTags(SHOW_ENTITY.ALUNO)
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerCreate {
  constructor(private readonly alunoService: AlunoServiceCreate) {}

  @Post(ROTA.ALUNO.CRIAR)
  @ApiRespostaPadrao(AlunoResponse, false, MENSAGEM.ALUNO.CRIAR)
  async create(@Body() alunoRequest: AlunoRequest, @Req() req: Request): Promise<Result<AlunoResponse>> {
    const response = await this.alunoService.create(alunoRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.ALUNO.CRIAR, response, req.path, null);
  }
}
