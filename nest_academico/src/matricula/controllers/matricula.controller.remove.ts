import { Controller, Delete, HttpStatus, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { ApiDeleteDoc } from '../../commons/decorators/swagger.decorators';
import { MATRICULA } from '../constants/alunodisciplina.constants';
import { MatriculaServiceRemove } from '../services/matricula.service.remove';

@ApiTags(SHOW_ENTITY.MATRICULA)
@Controller(ROTA.MATRICULA.BASE)
export class MatriculaControllerRemove {
  constructor(private readonly matriculaService: MatriculaServiceRemove) {}

  @Delete(ROTA.MATRICULA.EXCLUIR)
  @ApiDeleteDoc(MATRICULA.OPERACAO.EXCLUIR)
  async remove(
    @Param('idAluno', ParseIntPipe) idAluno: number,
    @Param('idDisciplina', ParseIntPipe) idDisciplina: number,
    @Req() res: Request,
  ): Promise<Result<void>> {
    await this.matriculaService.remove(idAluno, idDisciplina);
    return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.MATRICULA.EXCLUIR, null, res.path, null);
  }
}
