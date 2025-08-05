import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';

import { Result } from 'src/commons/response/mensagem';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { ApiTags } from '@nestjs/swagger';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceFindAll } from '../service/aluno.service.findall';

@ApiTags(SHOW_ENTITY.ALUNO)
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerFindAll {
  constructor(private readonly alunoService: AlunoServiceFindAll) {}

  @Get(ROTA.ALUNO.LISTAR)
  @ApiRespostaPadrao(AlunoResponse, true, MENSAGEM.ALUNO.LISTAR)
  async findAll(@Req() req: Request): Promise<Result<AlunoResponse[]>> {
    const response = await this.alunoService.findAll();
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.ALUNO.LISTAR, response, req.path, null);
  }
}
