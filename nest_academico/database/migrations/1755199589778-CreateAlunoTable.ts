import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateAlunoTable1755199589778 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ALUNO',
        columns: [
          { name: 'ID_ALUNO', type: 'number', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'COD_ALUNO', type: 'varchar2', length: '10', isUnique: true, isNullable: false },
          { name: 'NOME_ALUNO', type: 'varchar2', length: '50', isNullable: true },
          { name: 'IDADE', type: 'number', isNullable: true },
          { name: 'ID_USUARIO', type: 'number', isNullable: false },
          { name: 'CREATED_AT', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
          { name: 'UPDATED_AT', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'ALUNO',
      new TableForeignKey({
        columnNames: ['ID_USUARIO'],
        referencedColumnNames: ['ID_USUARIO'],
        referencedTableName: 'USUARIO',
        name: 'FK_ALUNO_USUARIO',
      }),
    );

    await queryRunner.query(`
            CREATE OR REPLACE TRIGGER "TRG_ALUNO_UPDATED_AT"
            BEFORE UPDATE ON "ALUNO"
            FOR EACH ROW
            BEGIN
                :new."UPDATED_AT" := CURRENT_TIMESTAMP;
            END;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER "TRG_ALUNO_UPDATED_AT"`);
    await queryRunner.dropForeignKey('ALUNO', 'FK_ALUNO_USUARIO');
    await queryRunner.dropTable('ALUNO');
  }
}
