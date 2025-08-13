import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';

import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { MENSAGENS_GENERICAS } from '../../commons/enum/mensagem.generica.enum';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceFindOne } from '../service/professor.service.findone';

@ApiTags(SHOW_ENTITY.PROFESSOR)
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerFindOne {
  constructor(private readonly professorService: ProfessorServiceFindOne) {}

  @Get(ROTA.PROFESSOR.POR_ID)
  @ApiOperation({ summary: MENSAGEM.PROFESSOR.OPERACAO_POR_ID })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.ALUNO.POR_ID,
    type: ProfessorResponse,
  })
  @ApiParam({
    name: 'id',
    description: MENSAGENS_GENERICAS.IDENTIFICADOR_UNICO,
    required: true,
    type: 'número',
  })
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<ProfessorResponse>> {
    const response = await this.professorService.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.PROFESSOR.POR_ID, response, req.path, null);
  }
}
