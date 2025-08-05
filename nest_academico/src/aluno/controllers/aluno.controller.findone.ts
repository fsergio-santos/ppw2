import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { ApiTags } from '@nestjs/swagger';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceFindOne } from '../service/aluno.service.findone';

@ApiTags(SHOW_ENTITY.ALUNO)
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerFindOne {
  constructor(private readonly alunoService: AlunoServiceFindOne) {}

  @Get(ROTA.ALUNO.POR_ID)
  @ApiRespostaPadrao(AlunoResponse, false, MENSAGEM.ALUNO.POR_ID)
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<AlunoResponse>> {
    const response = await this.alunoService.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.ALUNO.POR_ID, response, req.path, null);
  }
}
