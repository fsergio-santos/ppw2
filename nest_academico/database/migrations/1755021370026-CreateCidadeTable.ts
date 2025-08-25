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
            generationStrategy: 'increment',
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
    await queryRunner.query(`
            CREATE OR REPLACE TRIGGER "TRG_CIDADE_UPDATED_AT"
            BEFORE UPDATE ON "CIDADE"
            FOR EACH ROW
            BEGIN
                :new."UPDATED_AT" := CURRENT_TIMESTAMP;
            END;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER "TRG_CIDADE_UPDATED_AT"`);
    await queryRunner.dropTable('CIDADE');
  }
}
