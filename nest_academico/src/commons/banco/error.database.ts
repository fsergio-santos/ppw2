import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';

export function tratarErroBanco(error: any, id?: number, entity?: string): never {
  const message = error?.message?.toLowerCase?.() || '';

  if (message.includes('unique constraint') || message.includes('duplicat')) {
    throw new ConflictException({
      statusCode: HttpStatus.CONFLICT,
      message:
        id && entity
          ? `Não foi possível processar o registro do ${entity} com o código ${id} informado `
          : `Não foi possível processar o registro informado`,
      erro: 'Duplicidade de Registro ',
    });
  }

  if (message.includes('foreign key') || message.includes('integrity constraint')) {
    throw new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message:
        id && entity
          ? `Não foi possível processar o registro do ${entity} com o código ${id} informado `
          : `Não foi possível processar o registro informado`,
      erro: 'Integridade referencial violada',
    });
  }

  if (message.includes('connection') || message.includes('timeout') || message.includes('database is unavailable')) {
    throw new ServiceUnavailableException(HttpStatus.INTERNAL_SERVER_ERROR, 'Erro de conexão com o banco de dados.');
  }

  throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR, 'Erro interno ao processar os dados.');
}
