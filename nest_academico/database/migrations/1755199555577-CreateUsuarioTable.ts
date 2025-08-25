import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUsuarioTable1755199555577 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'USUARIO',
        columns: [
          {
            name: 'ID_USUARIO',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'COD_USUARIO',
            type: 'varchar',
            length: '10',
            isUnique: true,
          },
          {
            name: 'NOME_USUARIO',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'EMAIL',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'SENHA',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'FOTO',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'TIPO',
            type: 'int',
            default: 1,
          },
          {
            name: 'ID_CIDADE',
            type: 'int',
          },
          {
            name: 'ativo',
            type: 'int',
            default: 1,
          },
          {
            name: 'CREATED_AT',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'UPDATED_AT',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'USUARIO',
      new TableForeignKey({
        columnNames: ['ID_CIDADE'],
        referencedTableName: 'CIDADE',
        referencedColumnNames: ['ID_CIDADE'],
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );

    await queryRunner.query(`
            CREATE OR REPLACE TRIGGER "TRG_USUARIO_UPDATED_AT"
            BEFORE UPDATE ON "USUARIO"
            FOR EACH ROW
            BEGIN
                :new."UPDATED_AT" := CURRENT_TIMESTAMP;
            END;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER "TRG_USUARIO_UPDATED_AT"`);
    await queryRunner.dropForeignKey('USUARIO', 'FK_USUARIO_CIDADE');
    await queryRunner.dropTable('USUARIO');
  }
}
