import { Controller, HttpStatus, Delete, Param, ParseIntPipe, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';

import { Result } from 'src/commons/response/mensagem';
import { ApiTags } from '@nestjs/swagger';
import { ApiRespostaPadrao } from 'src/commons/decorators/swagger.decorators';
import { ROTA } from 'src/commons/constants/url.sistema';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ProfessorServiceRemove } from '../service/professor.service.remove';
import { ProfessorResponse } from '../dto/response/professor.response';

@ApiTags(SHOW_ENTITY.PROFESSOR)
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerRemove {
  constructor(private readonly professorService: ProfessorServiceRemove) {}

  @Delete(ROTA.PROFESSOR.EXCLUIR)
  @ApiRespostaPadrao(ProfessorResponse, false, MENSAGEM.PROFESSOR.EXCLUIR)
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<void>> {
    await this.professorService.remove(id, true);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.PROFESSOR.EXCLUIR, null, req.path, null);
  }
}
