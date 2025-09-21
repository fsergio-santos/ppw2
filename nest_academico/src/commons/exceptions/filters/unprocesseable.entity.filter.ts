import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';
import { sendHttpResponse } from '../../response/send.response';

@Catch(UnprocessableEntityException)
export class UnprocessebleEntityExceptionFilter implements ExceptionFilter {
  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = HttpStatus.UNPROCESSABLE_ENTITY;

    const exceptionResponse = exception.getResponse() as any;
    const data: Record<string, string[]> = {};

    let errors: ValidationError[] = [];

    if (Array.isArray(exceptionResponse)) {
      errors = exceptionResponse;
    } else if (Array.isArray(exceptionResponse?.message)) {
      if (
        exceptionResponse.message.some((m: unknown) => typeof m === 'object')
      ) {
        errors = exceptionResponse.message;
      }
    }

    for (const erro of errors) {
      if (erro?.property && erro?.constraints) {
        data[erro.property] = Object.values(erro.constraints);
      }
    }

    return sendHttpResponse(
      res,
      status,
      'Erro na digitação dos dados',
      data,
      req.path,
      null,
    );
  }
}
