import { Body, Controller, HttpStatus, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { ApiPutDoc } from '../../commons/decorators/swagger.decorators';
import { MATRICULA } from '../constants/alunodisciplina.constants';
import { MatriculaRequest } from '../dto/request/aluno.disciplina.request';
import { MatriculaResponse } from '../dto/response/aluno.disciplina.response';
import { MatriculaServiceUpdate } from '../services/matricula.service.update';

@ApiTags(SHOW_ENTITY.MATRICULA)
@Controller(ROTA.MATRICULA.BASE)
export class MatriculaControllerUpdate {
  constructor(private readonly matriculaService: MatriculaServiceUpdate) {}

  @Put(ROTA.MATRICULA.ATUALIZAR)
  @ApiPutDoc(MATRICULA.OPERACAO.ATUALIZAR, MatriculaRequest, MatriculaResponse)
  async update(@Body() matriculaRequest: MatriculaRequest, @Req() res: Request): Promise<Result<MatriculaResponse>> {
    const response = await this.matriculaService.updatePut(matriculaRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MATRICULA.OPERACAO.ATUALIZAR.SUCESSO, response, res.path, null);
  }
}
