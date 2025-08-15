import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';

import { AlunoRequest } from '../dto/request/aluno.request';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceCreate } from '../service/aluno.service.create';

@ApiTags(SHOW_ENTITY.ALUNO)
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerCreate {
  constructor(private readonly alunoService: AlunoServiceCreate) {}

  @Post(ROTA.ALUNO.CRIAR)
  @ApiOperation({ summary: MENSAGEM.ALUNO.OPERACAO_CRIAR })
  @ApiParam({
    name: 'AlunoRequest',
    description: MENSAGEM.ALUNO.OPERACAO_CRIAR,
    required: true,
    type: AlunoRequest,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: MENSAGEM.ALUNO.CRIAR,
    type: AlunoResponse,
  })
  @ApiConsumes(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async create(@Body() alunoRequest: AlunoRequest, @Req() req: Request): Promise<Result<AlunoResponse>> {
    const response = await this.alunoService.create(alunoRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.ALUNO.CRIAR, response, req.path, null);
  }
}
