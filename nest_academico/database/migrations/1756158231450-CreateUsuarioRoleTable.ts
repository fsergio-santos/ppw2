import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUsuarioRole1756158231450 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'USUARIO_ROLE',
        columns: [
          { name: 'USUARIO_ID', type: 'number', isPrimary: true, isNullable: false },
          { name: 'ROLE_ID', type: 'number', isPrimary: true, isNullable: false },
          { name: 'CREATED_AT', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
          { name: 'UPDATED_AT', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('USUARIO_ROLE', [
      new TableForeignKey({
        columnNames: ['USUARIO_ID'],
        referencedColumnNames: ['ID_USUARIO'],
        referencedTableName: 'USUARIO',
        name: 'FK_USUARIO_ROLE_USUARIO',
      }),
      new TableForeignKey({
        columnNames: ['ROLE_ID'],
        referencedColumnNames: ['ID_ROLE'],
        referencedTableName: 'ROLE',
        name: 'FK_USUARIO_ROLE_ROLE',
      }),
    ]);

    await queryRunner.query(`
            CREATE OR REPLACE TRIGGER "TRG_USUARIO_ROLE_UPDATED_AT"
            BEFORE UPDATE ON "USUARIO_ROLE"
            FOR EACH ROW
            BEGIN
                :new."UPDATED_AT" := CURRENT_TIMESTAMP;
            END;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER "TRG_USUARIO_ROLE_UPDATED_AT"`);
    await queryRunner.dropForeignKey('USUARIO_ROLE', 'FK_USUARIO_ROLE_USUARIO');
    await queryRunner.dropForeignKey('USUARIO_ROLE', 'FK_USUARIO_ROLE_ROLE');
    await queryRunner.dropTable('USUARIO_ROLE');
  }
}
