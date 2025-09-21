import { HttpStatus } from '@nestjs/common';
import { NegocioException } from './negocio.exception';

export class UsuarioBloqueadoException extends NegocioException {
  constructor(message: string, error?: string | null) {
    super({
      statusCode: HttpStatus.LOCKED,
      message,
      error: error ?? 'Acesso bloqueado!',
    });
  }
}
