import { Body, Controller, HttpStatus, Param, ParseIntPipe, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { ApiPutDoc } from '../../commons/decorators/swagger.decorators';
import { DISCIPLINA } from '../constants/disciplina.constants';
import { DisciplinaRequest } from '../dto/request/disciplina.request';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { DisciplinaServiceUpdate } from '../service/disciplina.service.update';

@ApiTags(SHOW_ENTITY.DISCIPLINA)
@Controller(ROTA.DISCIPLINA.BASE)
export class DisciplinaControllerUpdate {
  constructor(private readonly disciplinaService: DisciplinaServiceUpdate) {}

  @Put(ROTA.DISCIPLINA.ATUALIZAR)
  @ApiPutDoc(DISCIPLINA.OPERACAO.ATUALIZAR, DisciplinaRequest, DisciplinaResponse)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() disciplinaRequest: DisciplinaRequest,
    @Req() res: Request,
  ): Promise<Result<DisciplinaResponse>> {
    const response = await this.disciplinaService.updatePut(id, disciplinaRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, DISCIPLINA.OPERACAO.ATUALIZAR.SUCESSO, response, res.path, null);
  }
}
