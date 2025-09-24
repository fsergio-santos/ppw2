import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiProduces, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';

import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { ApiGetDoc } from '../../commons/decorators/swagger.decorators';
import { DISCIPLINA } from '../constants/disciplina.constants';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { DisciplinaServiceFindOne } from '../service/disciplina.service.findone';

@ApiTags(SHOW_ENTITY.DISCIPLINA)
@Controller(ROTA.DISCIPLINA.BASE)
export class DisciplinaControllerFindOne {
  constructor(private readonly disciplinaService: DisciplinaServiceFindOne) {}

  @Get(ROTA.DISCIPLINA.POR_ID)
  @ApiGetDoc(DISCIPLINA.OPERACAO.POR_ID, DisciplinaResponse)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() res: Request): Promise<Result<DisciplinaResponse>> {
    const response = await this.disciplinaService.findOne(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, DISCIPLINA.OPERACAO.POR_ID.SUCESSO, response, res.path, null);
  }
}
