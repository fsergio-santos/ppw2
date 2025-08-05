import { HttpStatus } from '@nestjs/common';
import { NegocioException } from './negocio.exception';

export class EntityNotFoundException extends NegocioException {
  constructor(message: string, erro?: string | null) {
    super({
      statusCode: HttpStatus.NOT_FOUND,
      message,
      erro: erro ?? 'registro não cadastrado no sistema',
    });
  }
}
