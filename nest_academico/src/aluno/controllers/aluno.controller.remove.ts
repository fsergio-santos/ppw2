import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { ApiTags } from '@nestjs/swagger';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { Controller, Delete, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { AlunoServiceRemove } from '../service/aluno.service.remove';
import { AlunoResponse } from '../dto/response/aluno.response';

@ApiTags(SHOW_ENTITY.ALUNO)
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerRemove {
  constructor(private readonly alunoService: AlunoServiceRemove) {}

  @Delete(ROTA.ALUNO.EXCLUIR)
  @ApiRespostaPadrao(AlunoResponse, false, MENSAGEM.ALUNO.EXCLUIR)
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<void>> {
    await this.alunoService.remove(id, true);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.ALUNO.EXCLUIR, null, req.path, null);
  }
}
