import { HttpStatus } from '@nestjs/common';
import { NegocioException } from './negocio.exception';

export class ErrorException extends NegocioException {
  constructor(message: string, erro?: string | null) {
    super({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      erro: erro ?? 'Erro interno do servidor!',
    });
  }
}
