import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SHOW_ENTITY } from 'src/commons/constants/mensagem.sistema';
import { ROTA_AUTH } from 'src/commons/constants/url.sistema';
import { MensagemSistema } from 'src/commons/response/mensagem.sistema';
import { JwtAuthGuard } from '../guard/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags(SHOW_ENTITY.AUTH)
@Controller(ROTA_AUTH.BASE)
export class ProfileController {
  @Get(ROTA_AUTH.PROFILE)
  getProfile(@Req() req: Request) {
    return MensagemSistema.showMensagem(HttpStatus.OK, null, req.user, req.path, null);
  }
}

