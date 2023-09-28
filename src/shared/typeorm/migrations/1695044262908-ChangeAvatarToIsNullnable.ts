import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeAvatarToIsNullnable1695044262908
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Crie uma nova tabela temporária com a coluna "avatar" permitindo valores nulos
    await queryRunner.query(
      'CREATE TABLE "users_temp" AS SELECT * FROM "users"',
    )

    // Remova a tabela original "users"
    await queryRunner.query('DROP TABLE "users"')

    // Renomeie a tabela temporária para "users"
    await queryRunner.query('ALTER TABLE "users_temp" RENAME TO "users"')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "avatar" SET NOT NULL',
    )
  }
}
