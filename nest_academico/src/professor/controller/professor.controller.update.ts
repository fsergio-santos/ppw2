import { Body, Controller, HttpStatus, Param, ParseIntPipe, Put, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { AlunoResponse } from '../../aluno/dto/response/aluno.response';
import { MENSAGENS_GENERICAS } from '../../commons/enum/mensagem.generica.enum';
import { ProfessorRequest } from '../dto/request/professor.request';
import { ProfessorResponse } from '../dto/response/professor.response';
import { ProfessorServiceUpdate } from '../service/professor.service.update';

@ApiTags(SHOW_ENTITY.PROFESSOR)
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerUpdate {
  constructor(private readonly professorService: ProfessorServiceUpdate) {}

  @Put(ROTA.PROFESSOR.ATUALIZAR)
  @ApiOperation({ summary: MENSAGEM.ALUNO.OPERACAO_ATUALIZAR })
  @ApiParam({
    name: 'ProfessorRequest',
    description: MENSAGEM.PROFESSOR.OPERACAO_ATUALIZAR,
    required: true,
    type: ProfessorRequest,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.PROFESSOR.ATUALIZAR,
    type: AlunoResponse,
  })
  @ApiConsumes(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiBody({ type: ProfessorRequest })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() professorRequest: ProfessorRequest,
    @Req() req: Request,
  ): Promise<Result<ProfessorResponse>> {
    const response = await this.professorService.updatePut(id, professorRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.PROFESSOR.ATUALIZAR, response, req.path, null);
  }
}
