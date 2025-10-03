import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';

import { ApiTags } from '@nestjs/swagger';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { ApiPostDoc } from '../../commons/decorators/swagger.decorators';
import { PROFESSOR } from '../constants/professor.constants';
import { ProfessorRequest } from '../dto/request/professor.request';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceCreate } from '../service/professor.service.create';

@ApiTags(SHOW_ENTITY.PROFESSOR)
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerCreate {
  constructor(private readonly professorService: ProfessorServiceCreate) {}

  @Post(ROTA.PROFESSOR.CRIAR)
  @ApiPostDoc(PROFESSOR.OPERACAO.CRIAR, ProfessorRequest, ProfessorResponse)
  async create(@Body() professorRequest: ProfessorRequest, @Req() req: Request): Promise<Result<ProfessorResponse>> {
    const response = await this.professorService.create(professorRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, PROFESSOR.OPERACAO.CRIAR.SUCESSO, response, req.path, null);
  }
}
