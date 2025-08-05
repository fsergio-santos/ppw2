import { Controller, Body, HttpStatus, Put, Param, ParseIntPipe, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';
import { ApiTags } from '@nestjs/swagger';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ProfessorServiceUpdate } from '../service/professor.service.update';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorRequest } from '../dto/request/professor.request';

@ApiTags(SHOW_ENTITY.PROFESSOR)
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerUpdate {
  constructor(private readonly professorService: ProfessorServiceUpdate) {}

  @Put(ROTA.PROFESSOR.ATUALIZAR)
  @ApiRespostaPadrao(ProfessorResponse, false, MENSAGEM.PROFESSOR.ATUALIZAR)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() professorRequest: ProfessorRequest,
    @Req() req: Request,
  ): Promise<Result<ProfessorResponse>> {
    const response = await this.professorService.updatePut(id, professorRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.PROFESSOR.ATUALIZAR, response, req.path, null);
  }
}
