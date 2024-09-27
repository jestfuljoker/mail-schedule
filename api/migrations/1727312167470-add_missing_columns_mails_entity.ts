import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMissingColumnsMailsEntity1727312167470 implements MigrationInterface {
	name = "AddMissingColumnsMailsEntity1727312167470";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "mails" ADD "destination_name" character varying NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "mails" ADD "subject" character varying NOT NULL`);
		await queryRunner.query(`ALTER TABLE "mails" ADD "body" text NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "mails" DROP COLUMN "body"`);
		await queryRunner.query(`ALTER TABLE "mails" DROP COLUMN "subject"`);
		await queryRunner.query(`ALTER TABLE "mails" DROP COLUMN "destination_name"`);
	}
}
