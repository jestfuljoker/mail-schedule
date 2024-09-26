import { FindAllMailDTO } from "@/modules/mail/dto/find-all-mail.dto";
import { MailStatus } from "@/modules/mail/enums/mail-status.enum";
import { MailEntity } from "@/modules/mail/mail.entity";
import { MailRepository } from "@/modules/mail/repositories/mail.repository";
import { faker } from "@faker-js/faker";
import { DeepPartial } from "typeorm";

export class FakeMailRepository extends MailRepository {
	private mails: MailEntity[] = [];

	private makeMail(model?: DeepPartial<MailEntity>): MailEntity {
		return {
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
			...model,
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

	async findAllMailToBeSent(filter?: FindAllMailDTO): Promise<MailEntity[]> {
		return this.mails.filter((mail) => {
			if (!filter) {
				return true;
			}

			let shouldReturn = true;

			if (filter?.dueDateLte) {
				shouldReturn = shouldReturn && mail.dueDate <= filter.dueDateLte;
			}

			if (filter?.status) {
				shouldReturn = shouldReturn && mail.status === filter.status;
			}

			return shouldReturn;
		});
	}

	async partialUpdate(id: string, partialEntity: Partial<MailEntity>): Promise<void> {
		const mailIndex = this.mails.findIndex((mail) => mail.id === id);

		if (mailIndex === -1) {
			return;
		}

		const updatedMail: MailEntity = {
			...this.mails[mailIndex],
			...partialEntity,
		};

		this.mails.splice(mailIndex, 1, updatedMail);
	}
}
