import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';

import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { PROFESSOR } from '../constants/professor.constants';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceFindOne } from '../service/professor.service.findone';
import { ApiGetDoc } from '../../commons/decorators/swagger.decorators';

@ApiTags(SHOW_ENTITY.PROFESSOR)
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerFindOne {
  constructor(private readonly professorService: ProfessorServiceFindOne) {}

  @Get(ROTA.PROFESSOR.POR_ID)
  @ApiGetDoc(PROFESSOR.OPERACAO.POR_ID, ProfessorResponse)
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<ProfessorResponse>> {
    const response = await this.professorService.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, PROFESSOR.OPERACAO.POR_ID.SUCESSO, response, req.path, null);
  }
}
