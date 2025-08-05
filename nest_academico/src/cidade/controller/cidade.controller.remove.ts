import { Controller, HttpStatus, Req, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';
import { ApiTags } from '@nestjs/swagger';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { CidadeServiceRemove } from '../service/cidade.service.remove';
import { CidadeResponse } from '../dto/response/cidade.response';

@ApiTags(SHOW_ENTITY.CIDADE)
@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerRemove {
  constructor(private readonly cidadeService: CidadeServiceRemove) {}

  @Delete(ROTA.CIDADE.EXCLUIR)
  @ApiRespostaPadrao(CidadeResponse, false, MENSAGEM.CIDADE.EXCLUIR)
  async remove(@Param('id', ParseIntPipe) id: number, @Req() res: Request): Promise<Result<void>> {
    await this.cidadeService.remove(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.CIDADE.EXCLUIR, null, res.path, null);
  }
}
