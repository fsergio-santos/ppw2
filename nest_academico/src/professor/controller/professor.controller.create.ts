import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';

import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { ProfessorRequest } from '../dto/request/professor.request';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceCreate } from '../service/professor.service.create';

@ApiTags(SHOW_ENTITY.PROFESSOR)
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerCreate {
  constructor(private readonly professorService: ProfessorServiceCreate) {}

  @Post(ROTA.PROFESSOR.CRIAR)
  @ApiOperation({ summary: MENSAGEM.PROFESSOR.OPERACAO_CRIAR })
  @ApiParam({
    name: 'ProfessorRequest',
    description: MENSAGEM.PROFESSOR.OPERACAO_CRIAR,
    required: true,
    type: ProfessorRequest,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: MENSAGEM.PROFESSOR.CRIAR,
    type: ProfessorResponse,
  })
  @ApiConsumes(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiBody({ type: ProfessorRequest })
  async create(@Body() professorRequest: ProfessorRequest, @Req() req: Request): Promise<Result<ProfessorResponse>> {
    const response = await this.professorService.create(professorRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.PROFESSOR.CRIAR, response, req.path, null);
  }
}
