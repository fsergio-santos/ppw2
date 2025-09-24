import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DbErrorType, getDbErrorMap } from './database-error-codes';

function buildErrorMessage(id?: number, entity?: string): string {
  if (id && entity) {
    return `Não foi possível processar o registro do(a) ${entity} com o código ${id} informado.`;
  }
  return 'Não foi possível processar o registro informado.';
}

export function tratarErroBanco(error: any, id?: number, entity?: string): never {
  const errorNumber = error?.errorNum;
  const errorCode = error?.code;

  const errorMap = getDbErrorMap();

  for (const errorType in errorMap) {
    const dbErrorCodes = errorMap[errorType as DbErrorType];

    if (dbErrorCodes.includes(errorNumber) || dbErrorCodes.includes(errorCode)) {
      switch (errorType as DbErrorType) {
        case DbErrorType.UniqueViolation:
          throw new ConflictException({
            statusCode: HttpStatus.CONFLICT,
            message: buildErrorMessage(id, entity),
            error: 'Duplicidade de Registro',
          });

        case DbErrorType.ForeignKeyViolation:
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: buildErrorMessage(id, entity),
            error: 'Integridade referencial violada. O registro está associado a outros dados.',
          });

        case DbErrorType.ConnectionError:
          throw new ServiceUnavailableException('Erro de conexão com o banco de dados.');
      }
    }
  }
  throw new InternalServerErrorException('Erro interno ao processar os dados.');
}
