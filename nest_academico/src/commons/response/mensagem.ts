import { ApiProperty } from '@nestjs/swagger';

export interface Result<T> {
  status: number;
  timestamp: string;
  mensagem?: string | null;
  erro?: string | null;
  dados?: T | null;
  path: string | null;
}

export class Mensagem<T> {
  @ApiProperty({ description: ' Código da requisição ', example: '200' })
  status: number;
  @ApiProperty({ description: ' Mensagem de retorno da API ', example: 'Cadastro realizado com sucesso' })
  mensagem: string | null;
  @ApiProperty({ description: ' Erros gerados na requisição à API ', example: 'Dados inválidos ' })
  erro?: string | null;
  @ApiProperty({ description: ' Dados processados pela API', example: '{ codigo: 1, nome: Antonio da Silva}' })
  dados: T | null;
  @ApiProperty({ description: ' url da requisição ', example: '/usuario/listar ' })
  path: string | null;

  constructor(
    status: number,
    mensagem: string | null = null,
    dados: T | null = null,
    path: string | null,
    erro: string | null,
  ) {
    this.status = status;
    this.mensagem = mensagem;
    this.dados = dados;
    this.path = path;
    this.erro = erro;
  }

  toJSON(): Result<T> {
    const result: Result<T> = {
      status: this.status,
      timestamp: new Date().toISOString().split('T')[0],
      path: this.path,
    };
    if (this.mensagem !== null && this.mensagem !== undefined) {
      result.mensagem = this.mensagem;
    }
    if (this.dados !== null && this.dados !== undefined) {
      result.dados = this.dados;
    }
    if (this.erro !== null && this.erro !== undefined) {
      result.erro = this.erro;
    }
    return result;
  }
}
