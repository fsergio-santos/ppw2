import { HttpStatus } from '@nestjs/common';
import { NegocioException } from './negocio.exception';

export class AcessoProibidoException extends NegocioException {
  constructor(message: string, erro?: string | null) {
    super({
      statusCode: HttpStatus.FORBIDDEN,
      message,
      erro: erro ?? 'Acesso negado!',
    });
  }
}
