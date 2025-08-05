import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { ApiTags } from '@nestjs/swagger';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { AlunoServiceUpdate } from '../service/aluno.service.update';
import { Body, Controller, HttpStatus, Param, ParseIntPipe, Put, Req } from '@nestjs/common';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoRequest } from '../dto/request/alunto.request';

@ApiTags(SHOW_ENTITY.ALUNO)
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerUpdate {
  constructor(private readonly alunoService: AlunoServiceUpdate) {}

  @Put(ROTA.ALUNO.ATUALIZAR)
  @ApiRespostaPadrao(AlunoResponse, false, MENSAGEM.ALUNO.ATUALIZAR)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() alunoRequest: AlunoRequest,
    @Req() req: Request,
  ): Promise<Result<AlunoResponse>> {
    const response = await this.alunoService.updatePut(id, alunoRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.ALUNO.ATUALIZAR, response, req.path, null);
  }
}
