export enum DbErrorType {
  UniqueViolation = 'UNIQUE_VIOLATION',
  ForeignKeyViolation = 'FOREIGN_KEY_VIOLATION',
  ConnectionError = 'CONNECTION_ERROR',
}

type DbErrorMap = Record<DbErrorType, (string | number)[]>;

const oracleErrorMap: DbErrorMap = {
  [DbErrorType.UniqueViolation]: [1], // ORA-00001
  [DbErrorType.ForeignKeyViolation]: [2291, 2292], // ORA-02291, ORA-02292
  [DbErrorType.ConnectionError]: [3113, 12154, 12541],
};

const postgresErrorMap: DbErrorMap = {
  [DbErrorType.UniqueViolation]: ['23505'],
  [DbErrorType.ForeignKeyViolation]: ['23503'],
  [DbErrorType.ConnectionError]: [],
};

export function getDbErrorMap(): DbErrorMap {
  const dbDialect = process.env.DATABASE_TYPE || 'oracle';

  switch (dbDialect.toLowerCase()) {
    case 'oracle':
      return oracleErrorMap;
    case 'postgres':
      return postgresErrorMap;
    default:
      return oracleErrorMap;
  }
}
