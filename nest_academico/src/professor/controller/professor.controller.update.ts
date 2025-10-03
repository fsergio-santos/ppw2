import { Body, Controller, HttpStatus, Param, ParseIntPipe, Put, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { ApiPutDoc } from '../../commons/decorators/swagger.decorators';
import { PROFESSOR } from '../constants/professor.constants';
import { ProfessorRequest } from '../dto/request/professor.request';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceUpdate } from '../service/professor.service.update';

@ApiTags(SHOW_ENTITY.PROFESSOR)
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerUpdate {
  constructor(private readonly professorService: ProfessorServiceUpdate) {}

  @Put(ROTA.PROFESSOR.ATUALIZAR)
  @ApiPutDoc(PROFESSOR.OPERACAO.ATUALIZAR, ProfessorRequest, ProfessorResponse)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() professorRequest: ProfessorRequest,
    @Req() req: Request,
  ): Promise<Result<ProfessorResponse>> {
    const response = await this.professorService.updatePut(id, professorRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, PROFESSOR.OPERACAO.ATUALIZAR.SUCESSO, response, req.path, null);
  }
}
