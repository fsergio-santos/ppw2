import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { ApiPostDoc } from '../../commons/decorators/swagger.decorators';
import { MATRICULA } from '../constants/alunodisciplina.constants';
import { MatriculaRequest } from '../dto/request/aluno.disciplina.request';
import { MatriculaResponse } from '../dto/response/aluno.disciplina.response';
import { MatriculaServiceCreate } from '../services/matricula.service.create';

@ApiTags(SHOW_ENTITY.MATRICULA)
@Controller(ROTA.MATRICULA.BASE)
//@UseGuards(AuthGuard('jwt'), CAGuard)
export class MatriculaControllerCreate {
  constructor(private readonly matriculaService: MatriculaServiceCreate) {}

  // @UseRoles({
  //   resource: SHOW_ENTITY.MATRICULA,
  //   action: Action.CREATE,
  //   possession: Possession.OWN,
  // })
  @Post(ROTA.MATRICULA.CRIAR)
  @ApiPostDoc(MATRICULA.OPERACAO.CRIAR, MatriculaRequest, MatriculaResponse)
  async create(@Body() matriculaRequest: MatriculaRequest, @Req() res: Request): Promise<Result<MatriculaResponse>> {
    const response = await this.matriculaService.create(matriculaRequest);
    return MensagemSistema.showMensagem(HttpStatus.OK, MATRICULA.OPERACAO.CRIAR.SUCESSO, response, res.path, null);
  }
}
