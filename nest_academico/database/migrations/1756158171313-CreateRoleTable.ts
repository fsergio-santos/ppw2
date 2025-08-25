import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoleTable1756158171313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ROLE',
        columns: [
          { name: 'ID_ROLE', type: 'number', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'NOME_ROLE', type: 'varchar2', length: '50', isUnique: true, isNullable: false },
          { name: 'CREATED_AT', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
          { name: 'UPDATED_AT', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.query(`
            CREATE OR REPLACE TRIGGER "TRG_ROLE_UPDATED_AT"
            BEFORE UPDATE ON "ROLE"
            FOR EACH ROW
            BEGIN
                :new."UPDATED_AT" := CURRENT_TIMESTAMP;
            END;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER "TRG_ROLE_UPDATED_AT"`);
    await queryRunner.dropTable('ROLE');
  }
}
