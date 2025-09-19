import { HttpStatus } from '@nestjs/common';
import { NegocioException } from './negocio.exception';

export class ValidationFieldsExcepiton extends NegocioException {
  constructor(message: string, erro?: string | null) {
    super({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      erro: erro ?? 'Campo informado para pesquisa é inválido',
    });
  }
}
