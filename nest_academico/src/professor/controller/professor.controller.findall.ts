import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { Request } from 'express';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { MENSAGENS_GENERICAS } from '../../commons/enum/mensagem.generica.enum';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceFindAll } from '../service/professor.service.findlall';

@ApiTags(SHOW_ENTITY.PROFESSOR)
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerFindAll {
  constructor(private readonly professorService: ProfessorServiceFindAll) {}

  @Get(ROTA.PROFESSOR.LISTAR)
  @ApiOperation({ summary: MENSAGEM.PROFESSOR.OPERACAO_LISTAR })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.PROFESSOR.LISTAR,
    type: ProfessorResponse,
  })
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async findAll(@Req() req: Request): Promise<Result<ProfessorResponse[]>> {
    const response = await this.professorService.findAll();
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.PROFESSOR.LISTAR, response, req.path, null);
  }
}
