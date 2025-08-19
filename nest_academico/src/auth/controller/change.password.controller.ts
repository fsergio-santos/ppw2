import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA_AUTH } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { MENSAGENS_GENERICAS } from '../../commons/enum/mensagem.generica.enum';
import { ChangePasswordRequest } from '../dto/request/change.password.request';
import { ChangePasswordService } from '../services/change.password.service';

@ApiTags(SHOW_ENTITY.AUTH)
@Controller(ROTA_AUTH.BASE)
@Controller()
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}
  @Post(ROTA_AUTH.CHANGE_PASSWORD)
  @ApiOperation({ summary: MENSAGEM.USUARIO.ATUALIZAR })
  @ApiParam({
    name: 'ChangePasswordRequest',
    description: MENSAGEM.USUARIO.ATUALIZAR,
    required: true,
    type: ChangePasswordRequest,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGEM.USUARIO.ATUALIZAR,
    type: MensagemSistema,
  })
  @ApiConsumes(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async changePassword(
    @Body() changePasswordRequest: ChangePasswordRequest,
    @Req() req: Request,
  ): Promise<Result<null> | null> {
    const response = await this.changePasswordService.changePassword(changePasswordRequest);
    if (response) {
      return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.USUARIO.ATUALIZAR, null, req.path, null);
    }
    return null;
  }
}
