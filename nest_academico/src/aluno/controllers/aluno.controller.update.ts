import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Body, Controller, HttpStatus, Param, ParseIntPipe, Put, Req } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { AlunoRequest } from '../dto/request/alunto.request';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceUpdate } from '../service/aluno.service.update';

@ApiTags(SHOW_ENTITY.ALUNO)
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerUpdate {
  constructor(private readonly alunoService: AlunoServiceUpdate) {}

  @Put(ROTA.ALUNO.ATUALIZAR)
  @ApiOperation({ summary: MENSAGEM.ALUNO.OPERACAO_ATUALIZAR })
  @ApiParam({
    name: 'AlunoRequest',
    description: MENSAGEM.ALUNO.OPERACAO_ATUALIZAR,
    required: true,
    type: AlunoRequest,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.ALUNO.ATUALIZAR,
    type: AlunoResponse,
  })
  @ApiConsumes(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() alunoRequest: AlunoRequest,
    @Req() req: Request,
  ): Promise<Result<AlunoResponse>> {
    const response = await this.alunoService.updatePut(id, alunoRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.ALUNO.ATUALIZAR, response, req.path, null);
  }
}
