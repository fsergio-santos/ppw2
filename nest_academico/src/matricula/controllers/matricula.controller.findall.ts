import { Controller, Get, HttpStatus, Query, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { PAGINATION } from '../../commons/enum/paginacao.enum';
import { Page } from '../../commons/pagination/paginacao.sistema';
import { MATRICULA } from '../constants/alunodisciplina.constants';
import { MatriculaResponse } from '../dto/response/aluno.disciplina.response';
import { MatriculaServiceFindAll } from '../services/matricula.service.findall';

@ApiTags(SHOW_ENTITY.MATRICULA)
@Controller(ROTA.MATRICULA.BASE)
export class MatriculaControllerFindAll {
  constructor(private readonly cidadeService: MatriculaServiceFindAll) {}

  @Get(ROTA.MATRICULA.LISTAR)
  async findAll(
    @Req() res: Request,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('field') field?: string,
    @Query('order') order?: string,
    @Query('search') search?: string,
  ): Promise<Result<Page<MatriculaResponse> | MatriculaResponse[]>> {
    let response = null;

    if (page && pageSize) {
      response = await this.cidadeService.findAllPaginateServer(
        page ? Number(page) : PAGINATION.PAGE,
        pageSize ? Number(pageSize) : PAGINATION.PAGESIZE,
        field ? field : MATRICULA.FIELDS.ALUNO_ID,
        order ? order : PAGINATION.ASC,
        search,
      );
    } else {
      response = await this.cidadeService.findAllPaginateClient();
    }

    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.MATRICULA.LISTAR, response, res.path, null);
  }
}
