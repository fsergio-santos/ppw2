import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MENSAGEM, SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA_AUTH } from 'src/commons/constants/url.sistema';
import { Result } from 'src/commons/response/mensagem';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { RegisterUsuarioRequest } from '../dto/request/register.usuario.request';
import { RegisterUsuarioService } from '../services/register.usuario.service';

@ApiTags(SHOW_ENTITY.AUTH)
@Controller(ROTA_AUTH.BASE)
@Controller()
export class RegisterUsuarioController {
  constructor(private readonly registerUsuarioService: RegisterUsuarioService) {}
  @Post(ROTA_AUTH.REGISTER)
  @ApiOkResponse({ description: MENSAGEM.AUTH.ATUALIZAR })
  async register(
    @Body() registerUsuarioRequest: RegisterUsuarioRequest,
    @Req() req: Request,
  ): Promise<Result<null> | null> {
    const response = await this.registerUsuarioService.register(registerUsuarioRequest);
    if (response) {
      return MensagemSistema.showMensagem(HttpStatus.OK, MENSAGEM.AUTH.CHECK_EMAIL, null, req.path, null);
    }
    return null;
  }
}
