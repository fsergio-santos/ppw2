import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';

import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceFindAll } from '../service/aluno.service.findall';

@ApiTags(SHOW_ENTITY.ALUNO)
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerFindAll {
  constructor(private readonly alunoService: AlunoServiceFindAll) {}

  @Get(ROTA.ALUNO.LISTAR)
  @ApiOperation({ summary: MENSAGEM.ALUNO.OPERACAO_LISTAR })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.ALUNO.LISTAR,
    type: AlunoResponse,
  })
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async findAll(@Req() req: Request): Promise<Result<AlunoResponse[]>> {
    const response = await this.alunoService.findAll();
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.ALUNO.LISTAR, response, req.path, null);
  }
}
