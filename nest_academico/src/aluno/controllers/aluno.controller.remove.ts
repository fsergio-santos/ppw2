import { Controller, Delete, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { AlunoServiceRemove } from '../service/aluno.service.remove';

@ApiTags(SHOW_ENTITY.ALUNO)
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerRemove {
  constructor(private readonly alunoService: AlunoServiceRemove) {}

  @Delete(ROTA.ALUNO.EXCLUIR)
  @ApiOperation({ summary: MENSAGEM.ALUNO.OPERACAO_POR_ID })
  @ApiParam({
    name: 'id',
    description: MENSAGENS_GENERICAS.IDENTIFICADOR_UNICO,
    required: true,
    type: 'número',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.ALUNO.EXCLUIR,
  })
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<void>> {
    await this.alunoService.remove(id, true);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.ALUNO.EXCLUIR, null, req.path, null);
  }
}
