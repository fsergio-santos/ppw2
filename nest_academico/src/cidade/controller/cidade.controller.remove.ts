import { Controller, HttpStatus, Req, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';
import { ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { CidadeServiceRemove } from '../service/cidade.service.remove';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';

@ApiTags(SHOW_ENTITY.CIDADE)
@Controller(ROTA.CIDADE.BASE)
export class CidadeControllerRemove {
  constructor(private readonly cidadeService: CidadeServiceRemove) {}

  @Delete(ROTA.CIDADE.EXCLUIR)
  @ApiOperation({ summary: MENSAGEM.CIDADE.OPERACAO_POR_ID })
  @ApiParam({
    name: 'id',
    description: MENSAGENS_GENERICAS.IDENTIFICADOR_UNICO,
    required: true,
    type: 'número',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.CIDADE.EXCLUIR,
  })
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async remove(@Param('id', ParseIntPipe) id: number, @Req() res: Request): Promise<Result<void>> {
    await this.cidadeService.remove(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.CIDADE.EXCLUIR, null, res.path, null);
  }
}
