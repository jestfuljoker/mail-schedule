import { MailStatus } from "@/modules/mail/enums/mail-status.enum";
import { MailEntity } from "@/modules/mail/mail.entity";
import { MailRepository } from "@/modules/mail/repositories/mail.repository";
import { faker } from "@faker-js/faker";
import { DeepPartial } from "typeorm";

export class FakeMailRepository implements MailRepository {
	private mails: MailEntity[] = [];

	private makeMail(model?: DeepPartial<MailEntity>): MailEntity {
		return {
			...model,
			id: faker.string.uuid(),
			status: MailStatus.WAITING,
			destinationName: faker.person.fullName(),
			destinationAddress: faker.internet.email(),
			subject: faker.lorem.sentence(),
			dueDate: faker.date.recent().toISOString(),
			body: `<p>${faker.lorem.paragraphs(5)}</p>`,
			createdAt: faker.date.recent().toISOString(),
			updatedAt: faker.date.recent().toISOString(),
			deletedAt: null,
		};
	}

	create(entityLikeArray: DeepPartial<MailEntity>[]): MailEntity[];
	create(entityLike?: DeepPartial<MailEntity> | undefined): MailEntity;
	create(
		entityLike?: DeepPartial<MailEntity> | DeepPartial<MailEntity>[] | undefined,
	): MailEntity | MailEntity[] {
		return Array.isArray(entityLike) ? entityLike.map(this.makeMail) : this.makeMail(entityLike);
	}

	async save(model: MailEntity): Promise<MailEntity> {
		this.mails.push(model);
		return model;
	}
}
