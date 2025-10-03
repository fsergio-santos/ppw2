import { Controller, Delete, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ApiProduces, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { ApiDeleteDoc } from '../../commons/decorators/swagger.decorators';
import { ALUNO } from '../constants/aluno.constants';
import { AlunoServiceRemove } from '../service/aluno.service.remove';

@ApiTags(SHOW_ENTITY.ALUNO)
@Controller(ROTA.ALUNO.BASE)
export class AlunoControllerRemove {
  constructor(private readonly alunoService: AlunoServiceRemove) {}

  @Delete(ROTA.ALUNO.EXCLUIR)
  @ApiDeleteDoc(ALUNO.OPERACAO.EXCLUIR)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<void>> {
    await this.alunoService.remove(id, true);
    return MensagemSistema.showMensagem(HttpStatus.OK, ALUNO.OPERACAO.EXCLUIR.SUCESSO, null, req.path, null);
  }
}
