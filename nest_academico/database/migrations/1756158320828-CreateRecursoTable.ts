import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRecursoTable1756158320828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'RECURSO',
        columns: [
          { name: 'ID_RECURSO', type: 'number', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'NOME_RECURSO', type: 'varchar2', length: '100', isUnique: true, isNullable: false },
          { name: 'CREATED_AT', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
          { name: 'UPDATED_AT', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.query(`
            CREATE OR REPLACE TRIGGER "TRG_RECURSO_UPDATED_AT"
            BEFORE UPDATE ON "RECURSO"
            FOR EACH ROW
            BEGIN
                :new."UPDATED_AT" := CURRENT_TIMESTAMP;
            END;
        `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER "TRG_RECURSO_UPDATED_AT"`);
    await queryRunner.dropTable('RECURSO');
  }
}
