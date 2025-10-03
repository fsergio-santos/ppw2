import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { Request } from 'express';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiTags } from '@nestjs/swagger';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { ApiListDoc } from '../../commons/decorators/swagger.decorators';
import { PROFESSOR } from '../constants/professor.constants';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceFindAll } from '../service/professor.service.findlall';

@ApiTags(SHOW_ENTITY.PROFESSOR)
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerFindAll {
  constructor(private readonly professorService: ProfessorServiceFindAll) {}

  @Get(ROTA.PROFESSOR.LISTAR)
  @ApiListDoc(PROFESSOR.OPERACAO.LISTAR, ProfessorResponse)
  async findAll(@Req() req: Request): Promise<Result<ProfessorResponse[]>> {
    const response = await this.professorService.findAll();
    return MensagemSistema.showMensagem(HttpStatus.OK, PROFESSOR.OPERACAO.LISTAR.SUCESSO, response, req.path, null);
  }
}
