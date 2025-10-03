import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';

import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { ApiListDoc } from '../../commons/decorators/swagger.decorators';
import { ALUNO } from '../constants/aluno.constants';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceFindAll } from '../service/aluno.service.findall';

@ApiTags(SHOW_ENTITY.ALUNO)
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerFindAll {
  constructor(private readonly alunoService: AlunoServiceFindAll) {}

  @Get(ROTA.ALUNO.LISTAR)
  @ApiListDoc(ALUNO.OPERACAO.LISTAR, AlunoResponse)
  async findAll(@Req() req: Request): Promise<Result<AlunoResponse[]>> {
    const response = await this.alunoService.findAll();
    return MensagemSistema.showMensagem(HttpStatus.OK, ALUNO.OPERACAO.LISTAR.SUCESSO, response, req.path, null);
  }
}
