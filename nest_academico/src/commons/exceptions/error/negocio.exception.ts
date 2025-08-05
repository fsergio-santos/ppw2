import { HttpException } from '@nestjs/common';

type NegocioExceptionProps = {
  statusCode: number;
  message: string;
  erro?: string | null;
};

export class NegocioException extends HttpException {
  public readonly erro: string | null;
  public readonly mensagem: string;

  constructor({ statusCode, message, erro }: NegocioExceptionProps) {
    super({ statusCode, message, error: erro }, statusCode);
    this.mensagem = message;
    this.erro = erro ?? null;
  }
}
