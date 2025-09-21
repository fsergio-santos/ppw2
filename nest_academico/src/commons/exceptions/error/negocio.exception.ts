import { HttpException } from '@nestjs/common';

type NegocioExceptionProps = {
  statusCode: number;
  message: string;
  error?: string | null;
};

export class NegocioException extends HttpException {
  public readonly erro: string | null;
  public readonly mensagem: string;

  constructor({ statusCode, message, error }: NegocioExceptionProps) {
    super({ statusCode, message, error }, statusCode);
    this.mensagem = message;
    this.erro = error ?? null;
  }
}
