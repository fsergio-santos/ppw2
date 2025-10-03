import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';

import { ApiPostDoc } from '../../commons/decorators/swagger.decorators';
import { ALUNO } from '../constants/aluno.constants';
import { AlunoRequest } from '../dto/request/aluno.request';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceCreate } from '../service/aluno.service.create';

@ApiTags(SHOW_ENTITY.ALUNO)
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerCreate {
  constructor(private readonly alunoService: AlunoServiceCreate) {}

  @Post(ROTA.ALUNO.CRIAR)
  @ApiPostDoc(ALUNO.OPERACAO.CRIAR, AlunoRequest, AlunoResponse)
  async create(@Body() alunoRequest: AlunoRequest, @Req() req: Request): Promise<Result<AlunoResponse>> {
    const response = await this.alunoService.create(alunoRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, ALUNO.OPERACAO.CRIAR.SUCESSO, response, req.path, null);
  }
}
