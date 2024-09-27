import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFailedEnumToStatusColumn1727322946932 implements MigrationInterface {
	name = "AddFailedEnumToStatusColumn1727322946932";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TYPE "public"."mails_status_enum" RENAME TO "mails_status_enum_old"`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."mails_status_enum" AS ENUM('WAITING', 'SENT', 'FAILED')`,
		);
		await queryRunner.query(`ALTER TABLE "mails" ALTER COLUMN "status" DROP DEFAULT`);
		await queryRunner.query(
			`ALTER TABLE "mails" ALTER COLUMN "status" TYPE "public"."mails_status_enum" USING "status"::"text"::"public"."mails_status_enum"`,
		);
		await queryRunner.query(`ALTER TABLE "mails" ALTER COLUMN "status" SET DEFAULT 'WAITING'`);
		await queryRunner.query(`DROP TYPE "public"."mails_status_enum_old"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TYPE "public"."mails_status_enum" RENAME TO "mails_status_enum_old"`,
		);
		await queryRunner.query(`CREATE TYPE "public"."mails_status_enum" AS ENUM('WAITING', 'SENT')`);
		await queryRunner.query(`ALTER TABLE "mails" ALTER COLUMN "status" DROP DEFAULT`);
		await queryRunner.query(
			`ALTER TABLE "mails" ALTER COLUMN "status" TYPE "public"."mails_status_enum_old" USING "status"::"text"::"public"."mails_status_enum"`,
		);
		await queryRunner.query(`ALTER TABLE "mails" ALTER COLUMN "status" SET DEFAULT 'WAITING'`);
		await queryRunner.query(`DROP TYPE "public"."mails_status_enum_old"`);
	}
}
