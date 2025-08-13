import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCidadeTable1755021370026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'CIDADE',
        columns: [
          {
            name: 'ID_CIDADE',
            type: 'number',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: 'COD_CIDADE',
            type: 'varchar2',
            length: '10',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'NOME_CIDADE',
            type: 'varchar2',
            length: '50',
            isNullable: true,
          },
          {
            name: 'CREATED_AT',
            type: 'date',
            default: 'SYSDATE',
          },
          {
            name: 'UPDATED_AT',
            type: 'date',
            default: 'SYSDATE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('CIDADE');
  }
}
