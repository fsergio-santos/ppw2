import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { Request } from 'express';

import { Result } from 'src/commons/response/mensagem';
import { ApiTags } from '@nestjs/swagger';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceFindAll } from '../service/professor.service.findlall';

@ApiTags(SHOW_ENTITY.PROFESSOR)
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerFindAll {
  constructor(private readonly professorService: ProfessorServiceFindAll) {}

  @Get(ROTA.PROFESSOR.LISTAR)
  @ApiRespostaPadrao(ProfessorResponse, true, MENSAGEM.PROFESSOR.LISTAR)
  async findAll(@Req() req: Request): Promise<Result<ProfessorResponse[]>> {
    const response = await this.professorService.findAll();
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.PROFESSOR.LISTAR, response, req.path, null);
  }
}
