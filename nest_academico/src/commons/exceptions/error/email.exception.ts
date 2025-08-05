import { HttpStatus } from '@nestjs/common';
import { NegocioException } from './negocio.exception';

export class EmailException extends NegocioException {
  constructor(message: string, erro?: string | null) {
    super({
      statusCode: HttpStatus.CONFLICT,
      message,
      erro: erro ?? 'Conflito de e-mail',
    });
  }
}
