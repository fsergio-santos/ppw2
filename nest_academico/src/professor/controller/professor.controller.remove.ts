import { Controller, Delete, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { Request } from 'express';

import { ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { MENSAGENS_GENERICAS } from '../../commons/enum/mensagem.generica.enum';
import { ProfessorServiceRemove } from '../service/professor.service.remove';

@ApiTags(SHOW_ENTITY.PROFESSOR)
@Controller(ROTA.PROFESSOR.BASE)
export class ProfessorControllerRemove {
  constructor(private readonly professorService: ProfessorServiceRemove) {}

  @Delete(ROTA.PROFESSOR.EXCLUIR)
  @ApiOperation({ summary: MENSAGEM.PROFESSOR.OPERACAO_POR_ID })
  @ApiParam({
    name: 'id',
    description: MENSAGENS_GENERICAS.IDENTIFICADOR_UNICO,
    required: true,
    type: 'número',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.PROFESSOR.EXCLUIR,
  })
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<Result<void>> {
    await this.professorService.remove(id, true);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.PROFESSOR.EXCLUIR, null, req.path, null);
  }
}
