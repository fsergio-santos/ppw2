import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { ApiPostDoc } from '../../commons/decorators/swagger.decorators';
import { CIDADE } from '../constants/cidade.constants';
import { CidadeRequest } from '../dto/request/cidade.request';
import { CidadeResponse } from '../dto/response/cidade.response';
import { CidadeServiceCreate } from '../service/cidade.service.create';

@ApiTags(SHOW_ENTITY.CIDADE)
@Controller(ROTA.CIDADE.BASE)
//@UseGuards(AuthGuard('jwt'), CAGuard)
export class CidadeControllerCreate {
  constructor(private readonly cidadeService: CidadeServiceCreate) {}

  // @UseRoles({
  //   resource: SHOW_ENTITY.CIDADE,
  //   action: Action.CREATE,
  //   possession: Possession.OWN,
  // })
  @Post(ROTA.CIDADE.CRIAR)
  @ApiPostDoc(CIDADE.OPERACAO.CRIAR, CidadeRequest, CidadeResponse)
  async create(@Body() cidadeRequest: CidadeRequest, @Req() res: Request): Promise<Result<CidadeResponse>> {
    const response = await this.cidadeService.create(cidadeRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, CIDADE.OPERACAO.CRIAR.SUCESSO, response, res.path, null);
  }
}
