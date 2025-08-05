import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA_AUTH } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { ForgotPasswordRequest } from '../dto/request/forgot.password.request';
import { ForgotPasswordService } from '../services/forgot.password.service';

@ApiTags(SHOW_ENTITY.AUTH)
@Controller(ROTA_AUTH.BASE)
@Controller()
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}
  @Post(ROTA_AUTH.FORGOT_PASSWORD)
  @ApiOkResponse({ description: MENSAGEM.AUTH.CHECK_EMAIL })
  async forgotPassword(
    @Body() forgotPasswordRequest: ForgotPasswordRequest,
    @Req() req: Request,
  ): Promise<Result<null> | null> {
    const response = await this.forgotPasswordService.forgotPassword(forgotPasswordRequest);
    if (response) {
      return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.AUTH.CHECK_EMAIL, null, req.path, null);
    }
    return null;
  }
}
