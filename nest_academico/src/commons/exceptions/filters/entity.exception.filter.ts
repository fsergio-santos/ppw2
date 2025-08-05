import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Request } from 'express';

import { MensagemSistema } from '../../response/mensagem.sistema';
import { EntityNotFoundException } from '../error/entity.exception';

@Catch(EntityNotFoundException)
export class EntityExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const mensagem = exception.mensagem;
    const erro = exception.erro;

    return MensagemSistema.showMensagem(status, mensagem, null, req.path, erro);
  }
}
