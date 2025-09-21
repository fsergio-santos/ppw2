import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

import { sendHttpResponse } from '../../response/send.response';
import { EntityNotFoundException } from '../error/entity.exception';

@Catch(EntityNotFoundException)
export class EntityExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const mensagem = exception.mensagem;
    const erro = exception.erro;

    return sendHttpResponse(res, status, mensagem, null, req.path, erro);
  }
}
