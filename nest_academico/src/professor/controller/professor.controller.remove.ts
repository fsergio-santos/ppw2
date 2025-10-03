import { Controller, Delete, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';

import { ApiTags } from '@nestjs/swagger';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { ApiDeleteDoc } from '../../commons/decorators/swagger.decorators';
import { PROFESSOR } from '../constants/professor.constants';
import { ProfessorServiceRemove } from '../service/professor.service.remove';

@ApiTags(SHOW_ENTITY.PROFESSOR)
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerRemove {
  constructor(private readonly professorService: ProfessorServiceRemove) {}

  @Delete(ROTA.PROFESSOR.EXCLUIR)
  @ApiDeleteDoc(PROFESSOR.OPERACAO.EXCLUIR)
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<void>> {
    await this.professorService.remove(id, true);
    return MensagemSistema.showMensagem(HttpStatus.OK, PROFESSOR.OPERACAO.EXCLUIR.SUCESSO, null, req.path, null);
  }
}
