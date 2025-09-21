import { Controller, Get, HttpStatus, Query, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { CIDADE_FIELDS } from '../../commons/constants/cidade.constants';
import { PAGINATION } from '../../commons/enum/paginacao.enum';
import { Page } from '../../commons/pagination/paginacao.sistema';
import { CidadeResponse } from '../dto/response/cidade.response';
import { CidadeServiceFindAll } from '../service/cidade.service.findall';

@ApiTags(SHOW_ENTITY.CIDADE)
@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerFindAll {
  constructor(private readonly cidadeService: CidadeServiceFindAll) {}

  @Get(ROTA.CIDADE.LISTAR)
  @ApiOperation({ summary: MENSAGEM.CIDADE.OPERACAO_LISTAR })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.USUARIO.LISTAR,
    type: CidadeResponse,
  })
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async findAll(
    @Req() res: Request,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('field') field?: string,
    @Query('order') order?: string,
    @Query('search') search?: string,
  ): Promise<Result<Page<CidadeResponse> | CidadeResponse[]>> {
    let response = null;

    if (page && pageSize) {
      response = await this.cidadeService.findAllPaginateServer(
        page ? Number(page) : PAGINATION.PAGE,
        pageSize ? Number(pageSize) : PAGINATION.PAGESIZE,
        field ? field : CIDADE_FIELDS.ID,
        order ? order : PAGINATION.ASC,
        search, 
      );
    } else {
      response = await this.cidadeService.findAllPaginateClient();
    }

    return MensagemSistema.showMensagem(
      HttpStatus.OK,
      MENSAGEM.CIDADE.LISTAR,
      response,
      res.path,
      null,
    );
  }
}
