import { HttpStatus } from '@nestjs/common';
import { NegocioException } from './negocio.exception';

export class AcessoProibidoException extends NegocioException {
  constructor(message: string, error?: string | null) {
    super({
      statusCode: HttpStatus.FORBIDDEN,
      message,
      error: error ?? 'Acesso negado!',
    });
  }
}
