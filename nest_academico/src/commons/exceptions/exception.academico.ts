import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { sendHttpResponse } from '../response/send.response';

interface RespostaErro {
  message?: string | string[];
  erro?: string;
  [key: string]: unknown;
}

@Catch(HttpException)
export class ShowExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const status = exception.getStatus(); // sempre pega o status correto
    let mensagem: string | string[] = 'Erro inesperado';
    let erro: string | null = null;

    const responseContent = exception.getResponse();

    if (typeof responseContent === 'string') {
      mensagem = responseContent;
    } else if (
      typeof responseContent === 'object' &&
      responseContent !== null
    ) {
      const erroResponse = responseContent as RespostaErro;

      if (Array.isArray(erroResponse.message)) {
        mensagem = erroResponse.message.join(', ');
      } else if (typeof erroResponse.message === 'string') {
        mensagem = erroResponse.message;
      }

      erro = erroResponse.erro ?? null;
    }

    return sendHttpResponse(res, status, mensagem, null, req.path, erro);
  }
}
