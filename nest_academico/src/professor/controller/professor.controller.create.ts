import { Controller, Post, Body, HttpStatus, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';

import { Result } from 'src/commons/response/mensagem';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ProfessorServiceCreate } from '../service/professor.service.create';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorRequest } from '../dto/request/professor.request';

@ApiTags(SHOW_ENTITY.PROFESSOR)
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerCreate {
  constructor(private readonly professorService: ProfessorServiceCreate) {}

  @Post(ROTA.PROFESSOR.CRIAR)
  @ApiRespostaPadrao(ProfessorResponse, false, MENSAGEM.PROFESSOR.CRIAR)
  @ApiBody({ type: ProfessorRequest })
  async create(@Body() professorRequest: ProfessorRequest, @Req() req: Request): Promise<Result<ProfessorResponse>> {
    const response = await this.professorService.create(professorRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.PROFESSOR.CRIAR, response, req.path, null);
  }
}
