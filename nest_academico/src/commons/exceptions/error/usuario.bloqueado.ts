import { HttpStatus } from '@nestjs/common';
import { NegocioException } from './negocio.exception';

export class UsuarioBloqueadoException extends NegocioException {
  constructor(message: string, erro?: string | null) {
    super({
      statusCode: HttpStatus.LOCKED,
      message,
      erro: erro ?? 'Acesso bloqueado!',
    });
  }
}
