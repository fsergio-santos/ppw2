import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProfessorTable1755199602345 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'PROFESSOR',
        columns: [
          { name: 'ID_PROFESSOR', type: 'number', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'COD_PROFESSOR', type: 'varchar2', length: '10', isUnique: true, isNullable: false },
          { name: 'NOME_PROFESSOR', type: 'varchar2', length: '50', isNullable: true },
          { name: 'ID_USUARIO', type: 'number', isNullable: false },
          { name: 'CREATED_AT', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
          { name: 'UPDATED_AT', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'PROFESSOR',
      new TableForeignKey({
        columnNames: ['ID_USUARIO'],
        referencedColumnNames: ['ID_USUARIO'],
        referencedTableName: 'USUARIO',
        name: 'FK_PROFESSOR_USUARIO',
      }),
    );

    await queryRunner.query(`
            CREATE OR REPLACE TRIGGER "TRG_PROFESSOR_UPDATED_AT"
            BEFORE UPDATE ON "PROFESSOR"
            FOR EACH ROW
            BEGIN
                :new."UPDATED_AT" := CURRENT_TIMESTAMP;
            END;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER "TRG_PROFESSOR_UPDATED_AT"`);
    await queryRunner.dropForeignKey('PROFESSOR', 'FK_PROFESSOR_USUARIO');
    await queryRunner.dropTable('PROFESSOR');
  }
}
