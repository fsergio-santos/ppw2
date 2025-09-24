import { Controller, Delete, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ApiProduces, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { ApiDeleteDoc } from '../../commons/decorators/swagger.decorators';
import { DISCIPLINA } from '../constants/disciplina.constants';
import { DisciplinaServiceRemove } from '../service/disciplina.service.remove';

@ApiTags(SHOW_ENTITY.DISCIPLINA)
@Controller(ROTA.DISCIPLINA.BASE)
export class DisciplinaControllerRemove {
  constructor(private readonly disciplinaService: DisciplinaServiceRemove) {}

  @Delete(ROTA.DISCIPLINA.EXCLUIR)
  @ApiDeleteDoc(DISCIPLINA.OPERACAO.EXCLUIR)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async remove(@Param('id', ParseIntPipe) id: number, @Req() res: Request): Promise<Result<void>> {
    await this.disciplinaService.remove(id);
    return MensagemSistema.showMensagem(HttpStatus.OK, DISCIPLINA.OPERACAO.EXCLUIR.SUCESSO, null, res.path, null);
  }
}
