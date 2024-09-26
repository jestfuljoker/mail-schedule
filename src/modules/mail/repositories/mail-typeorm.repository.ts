import { MailEntity } from "@/modules/mail/mail.entity";
import { MailRepository } from "@/modules/mail/repositories/mail.repository";
import { makeClassInstance } from "@/shared/utils/create-class-instance";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class TypeormMailRepository implements MailRepository {
	constructor(
		@InjectRepository(MailEntity)
		private readonly mailRepository: Repository<MailEntity>,
	) {}

	create(entityLikeArray: DeepPartial<MailEntity>[]): MailEntity[];
	create(entityLike?: DeepPartial<MailEntity> | undefined): MailEntity;
	create(
		entityLike?: DeepPartial<MailEntity> | DeepPartial<MailEntity>[],
	): MailEntity | MailEntity[] {
		return makeClassInstance<MailEntity>(entityLike, this.mailRepository);
	}

	save(model: MailEntity): Promise<MailEntity> {
		return this.mailRepository.save(model);
	}
}
