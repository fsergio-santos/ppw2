import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceFindOne } from '../service/aluno.service.findone';

@ApiTags(SHOW_ENTITY.ALUNO)
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerFindOne {
  constructor(private readonly alunoService: AlunoServiceFindOne) {}

  @Get(ROTA.ALUNO.POR_ID)
  @ApiOperation({ summary: MENSAGEM.ALUNO.OPERACAO_POR_ID })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.ALUNO.POR_ID,
    type: AlunoResponse,
  })
  @ApiParam({
    name: 'id',
    description: MENSAGENS_GENERICAS.IDENTIFICADOR_UNICO,
    required: true,
    type: 'número',
  })
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<AlunoResponse>> {
    const response = await this.alunoService.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.ALUNO.POR_ID, response, req.path, null);
  }
}
