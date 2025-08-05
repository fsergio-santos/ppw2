import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

import { MensagemSistema } from '../../response/mensagem.sistema';
import { EmailException } from '../error/email.exception';

@Catch(EmailException)
export class EmailExceptionFilter implements ExceptionFilter {
  catch(exception: EmailException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const mensagem = exception.mensagem;
    const erro = exception.erro;

    return MensagemSistema.showMensagem(status, mensagem, null, req.path, erro);
  }
}
