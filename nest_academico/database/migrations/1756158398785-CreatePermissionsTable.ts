import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePermissionsTable1756158398785 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'PERMISSIONS',
        columns: [
          {
            name: 'ID_PERMISSION',
            type: 'number',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'ROLE_ID', type: 'number', isNullable: false },
          { name: 'RECURSO_ID', type: 'number', isNullable: false },
          { name: 'ACTION', type: 'varchar2', length: '20', isNullable: false },
          { name: 'POSSESSION', type: 'varchar2', length: '20', isNullable: false },
          { name: 'ATTRIBUTES', type: 'varchar2', length: '4000', isNullable: true },
          { name: 'CREATED_AT', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
          { name: 'UPDATED_AT', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('PERMISSIONS', [
      new TableForeignKey({
        columnNames: ['ROLE_ID'],
        referencedColumnNames: ['ID_ROLE'],
        referencedTableName: 'ROLE',
        name: 'FK_PERMISSIONS_ROLE',
      }),
      new TableForeignKey({
        columnNames: ['RECURSO_ID'],
        referencedColumnNames: ['ID_RECURSO'],
        referencedTableName: 'RECURSO',
        name: 'FK_PERMISSIONS_RECURSO',
      }),
    ]);

    await queryRunner.query(`
            CREATE OR REPLACE TRIGGER "TRG_PERMISSIONS_UPDATED_AT"
            BEFORE UPDATE ON "PERMISSIONS"
            FOR EACH ROW
            BEGIN
                :new."UPDATED_AT" := CURRENT_TIMESTAMP;
            END;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER "TRG_PERMISSIONS_UPDATED_AT"`);
    await queryRunner.dropForeignKey('PERMISSIONS', 'FK_PERMISSIONS_ROLE');
    await queryRunner.dropForeignKey('PERMISSIONS', 'FK_PERMISSIONS_RECURSO');
    await queryRunner.dropTable('PERMISSIONS');
  }
}
