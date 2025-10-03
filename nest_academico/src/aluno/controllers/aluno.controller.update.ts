import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Body, Controller, HttpStatus, Param, ParseIntPipe, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { ApiPutDoc } from '../../commons/decorators/swagger.decorators';
import { ALUNO } from '../constants/aluno.constants';
import { AlunoRequest } from '../dto/request/aluno.request';
import { AlunoResponse } from '../dto/response/aluno.response';
import { AlunoServiceUpdate } from '../service/aluno.service.update';

@ApiTags(SHOW_ENTITY.ALUNO)
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerUpdate {
  constructor(private readonly alunoService: AlunoServiceUpdate) {}

  @Put(ROTA.ALUNO.ATUALIZAR)
  @ApiPutDoc(ALUNO.OPERACAO.ATUALIZAR, AlunoRequest, AlunoResponse)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() alunoRequest: AlunoRequest,
    @Req() req: Request,
  ): Promise<Result<AlunoResponse>> {
    const response = await this.alunoService.updatePut(id, alunoRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, ALUNO.OPERACAO.ATUALIZAR.SUCESSO, response, req.path, null);
  }
}
