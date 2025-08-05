import { ExceptionFilter, Catch, UnprocessableEntityException, HttpStatus, ArgumentsHost } from '@nestjs/common';
import { Request } from 'express';
import { MensagemSistema } from '../../response/mensagem.sistema';

@Catch(UnprocessableEntityException)
export class UnprocessebleEntityExceptionFilter implements ExceptionFilter {
  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const status = HttpStatus.UNPROCESSABLE_ENTITY;
    const exceptionResponse = exception.getResponse() as any;
    const data: Record<string, string[]> = {};

    if (exceptionResponse?.message && Array.isArray(exceptionResponse.message)) {
      for (const erro of exceptionResponse.message) {
        if (erro?.property && erro?.constraints) {
          data[erro.property] = Object.values(erro.constraints);
        }
      }
    }

    return MensagemSistema.showMensagem(status, 'Erro na digitação dos dados', data, req.path, null);
  }
}
