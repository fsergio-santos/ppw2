import { Controller, Get, HttpStatus, Query, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { ApiListDoc } from '../../commons/decorators/swagger.decorators';
import { PAGINATION } from '../../commons/enum/paginacao.enum';
import { Page } from '../../commons/pagination/paginacao.sistema';
import { DISCIPLINA } from '../constants/disciplina.constants';
import { DisciplinaResponse } from '../dto/response/disciplina.response';
import { DisciplinaServiceFindAll } from '../service/disciplina.service.findall';

@ApiTags(SHOW_ENTITY.DISCIPLINA)
@Controller(ROTA.DISCIPLINA.BASE)
export class DisciplinaControllerFindAll {
  constructor(private readonly disciplinaService: DisciplinaServiceFindAll) {}

  @Get(ROTA.DISCIPLINA.LISTAR)
  @ApiListDoc(DISCIPLINA.OPERACAO.LISTAR, DisciplinaResponse)
  async findAll(
    @Req() res: Request,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('field') field?: string,
    @Query('order') order?: string,
    @Query('search') search?: string,
  ): Promise<Result<Page<DisciplinaResponse> | DisciplinaResponse[]>> {
    let response = null;

    if (page && pageSize) {
      response = await this.disciplinaService.findAllPaginateServer(
        page ? Number(page) : PAGINATION.PAGE,
        pageSize ? Number(pageSize) : PAGINATION.PAGESIZE,
        field ? field : DISCIPLINA.FIELDS.ID,
        order ? order : PAGINATION.ASC,
        search,
      );
    } else {
      response = await this.disciplinaService.findAllPaginateClient();
    }

    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.DISCIPLINA.LISTAR, response, res.path, null);
  }
}
