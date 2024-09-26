import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeStatusColumnToEnum1727315743569 implements MigrationInterface {
	name = "ChangeStatusColumnToEnum1727315743569";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "mails" DROP COLUMN "status"`);
		await queryRunner.query(`CREATE TYPE "public"."mails_status_enum" AS ENUM('WAITING', 'SENT')`);
		await queryRunner.query(
			`ALTER TABLE "mails" ADD "status" "public"."mails_status_enum" NOT NULL DEFAULT 'WAITING'`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "mails" DROP COLUMN "status"`);
		await queryRunner.query(`DROP TYPE "public"."mails_status_enum"`);
		await queryRunner.query(`ALTER TABLE "mails" ADD "status" character varying NOT NULL`);
	}
}
