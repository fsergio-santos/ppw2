import { HttpStatus } from '@nestjs/common';
import { NegocioException } from './negocio.exception';

export class EntityRegisteredExcepiton extends NegocioException {
  constructor(message: string, erro?: string | null) {
    super({
      statusCode: HttpStatus.CONFLICT,
      message,
      erro: erro ?? 'Registro já cadastrado no sistema',
    });
  }
}
