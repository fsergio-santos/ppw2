import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA_AUTH } from 'src/commons/constants/url.sistema';
import { MENSAGENS_GENERICAS } from 'src/commons/enum/mensagem.generica.enum';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { ResetPasswordRequest } from '../dto/request/reset.password.request';
import { ResetPasswordService } from '../services/reset.password.service';

@ApiTags(SHOW_ENTITY.AUTH)
@Controller(ROTA_AUTH.BASE)
@Controller()
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}
  @Post(ROTA_AUTH.RESET_PASSWORD)
  @ApiOperation({ summary: MENSAGEM.USUARIO.OPERACAO_ATUALIZAR })
  @ApiParam({
    name: 'ResetPasswordRequest',
    description: MENSAGEM.USUARIO.OPERACAO_ATUALIZAR,
    required: true,
    type: ResetPasswordRequest,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: MENSAGENS_GENERICAS.RESET_PASSWORD,
    type: MensagemSistema,
  })
  @ApiConsumes(MENSAGENS_GENERICAS.JSON_APPLICATION)
  @ApiProduces(MENSAGENS_GENERICAS.JSON_APPLICATION)
  async forgotPassword(
    @Body() resetPasswordRequest: ResetPasswordRequest,
    @Req() req: Request,
  ): Promise<Result<null> | null> {
    const response = await this.resetPasswordService.resetPassword(resetPasswordRequest);
    if (response) {
      return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGENS_GENERICAS.RESET_PASSWORD, null, req.path, null);
    }
    return null;
  }
}
