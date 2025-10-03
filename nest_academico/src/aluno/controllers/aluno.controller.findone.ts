import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { ApiGetDoc } from '../../commons/decorators/swagger.decorators';
import { ALUNO } from '../constants/aluno.constants';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceFindOne } from '../service/aluno.service.findone';

@ApiTags(SHOW_ENTITY.ALUNO)
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerFindOne {
  constructor(private readonly alunoService: AlunoServiceFindOne) {}

  @Get(ROTA.ALUNO.POR_ID)
  @ApiGetDoc(ALUNO.OPERACAO.POR_ID, AlunoResponse)
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<AlunoResponse>> {
    const response = await this.alunoService.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, ALUNO.OPERACAO.POR_ID.SUCESSO, response, req.path, null);
  }
}
