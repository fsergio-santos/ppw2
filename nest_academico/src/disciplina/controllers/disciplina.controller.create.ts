import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { ApiPostDoc } from '../../commons/decorators/swagger.decorators';
import { DISCIPLINA } from '../constants/disciplina.constants';
import { DisciplinaRequest } from '../dto/request/disciplina.request';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { DisciplinaServiceCreate } from '../service/disciplina.service.create';

@ApiTags(DISCIPLINA.ENTITY)
@Controller(ROTA.DISCIPLINA.BASE)
export class DisciplinaControllerCreate {
  constructor(private readonly disciplinaService: DisciplinaServiceCreate) {}

  @Post(ROTA.DISCIPLINA.CRIAR)
  @ApiPostDoc(DISCIPLINA.OPERACAO.CRIAR, DisciplinaRequest, DisciplinaResponse)
  async create(@Body() disciplinaRequest: DisciplinaRequest, @Req() res: Request): Promise<Result<DisciplinaResponse>> {
    const response = await this.disciplinaService.create(disciplinaRequest);
    return MensagemSistema.showMensagem(
      HttpStatus.CREATED,
      DISCIPLINA.OPERACAO.CRIAR.SUCESSO,
      response,
      res.path,
      null,
    );
  }
}
