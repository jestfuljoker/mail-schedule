import { FindAllMailDTO } from "@/modules/mail/dto/find-all-mail.dto";
import { MailEntity } from "@/modules/mail/mail.entity";
import { MailRepository } from "@/modules/mail/repositories/mail.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TypeormMailRepository extends MailRepository {
	constructor(
		@InjectRepository(MailEntity)
		private readonly mailRepository: Repository<MailEntity>,
	) {
		super(mailRepository);
	}

	async findAllMailToBeSent(filter?: FindAllMailDTO): Promise<MailEntity[]> {
		const query = this.mailRepository.createQueryBuilder("mail");

		if (filter?.dueDateLte) {
			query.andWhere("mail.dueDate <= :dueDateLte", {
				dueDateLte: filter.dueDateLte,
			});
		}

		if (filter?.status) {
			query.andWhere("mail.status = :status", { status: filter.status });
		}

		return query.getMany();
	}
}
