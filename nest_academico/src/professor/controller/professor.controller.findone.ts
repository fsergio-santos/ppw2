import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';

import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';
import { ApiTags } from '@nestjs/swagger';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ProfessorServiceFindOne } from '../service/professor.service.findone';
import { ProfessorResponse } from '../dto/response/professor.response';

@ApiTags(SHOW_ENTITY.PROFESSOR)
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerFindOne {
  constructor(private readonly professorService: ProfessorServiceFindOne) {}

  @Get(ROTA.PROFESSOR.POR_ID)
  @ApiRespostaPadrao(ProfessorResponse, false, MENSAGEM.PROFESSOR.POR_ID)
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<ProfessorResponse>> {
    const response = await this.professorService.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.PROFESSOR.POR_ID, response, req.path, null);
  }
}
