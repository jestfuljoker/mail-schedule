import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMailsEntity1727310138263 implements MigrationInterface {
	name = "AddMailsEntity1727310138263";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "mails" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "destination_address" character varying NOT NULL,
                "due_date" TIMESTAMP NOT NULL,
                "status" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_218248d7dfe1b739f06e2309349" PRIMARY KEY ("id")
            )`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "mails"`);
	}
}
