import { HttpStatus } from '@nestjs/common';
import { NegocioException } from './negocio.exception';

export class EntityRegisteredExcepiton extends NegocioException {
  constructor(message: string, error?: string | null) {
    super({
      statusCode: HttpStatus.CONFLICT,
      message,
      error: error ?? 'Registro já cadastrado no sistema',
    });
  }
}
