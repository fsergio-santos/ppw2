import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';

import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Result } from 'src/commons/response/mensagem';

import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { ApiGetDoc } from '../../commons/decorators/swagger.decorators';
import { MATRICULA } from '../constants/alunodisciplina.constants';
import { MatriculaResponse } from '../dto/response/aluno.disciplina.response';
import { MatriculaServiceFindOne } from '../services/matricula.service.findone';

@ApiTags(SHOW_ENTITY.MATRICULA)
@Controller(ROTA.MATRICULA.BASE)
export class MatriculaControllerFindOne {
  constructor(private readonly matriculaService: MatriculaServiceFindOne) {}

  @Get(ROTA.MATRICULA.POR_ID)
  @ApiGetDoc(MATRICULA.OPERACAO.POR_ID, MatriculaResponse)
  async findOne(
    @Param('idAluno', ParseIntPipe) idAluno: number,
    @Param('idDisciplina', ParseIntPipe) idDisciplina: number,
    @Req() res: Request,
  ): Promise<Result<MatriculaResponse>> {
    const response = await this.matriculaService.findOne(idAluno, idDisciplina);
    return MensagemSistema.showMensagem(HttpStatus.OK, MATRICULA.OPERACAO.POR_ID.SUCESSO, response, res.path, null);
  }
}
