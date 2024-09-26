import { FindAllMailDTO } from "@/modules/mail/dto/find-all-mail.dto";
import { SaveMailDTO } from "@/modules/mail/dto/save-mail.dto";
import { MailStatus } from "@/modules/mail/enums/mail-status.enum";
import { MailEntity } from "@/modules/mail/mail.entity";
import { MailRepository } from "@/modules/mail/repositories/mail.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
	constructor(private readonly mailRepository: MailRepository) {}

	async save(saveMailDTO: SaveMailDTO): Promise<MailEntity> {
		return this.mailRepository.save(this.mailRepository.create(saveMailDTO));
	}

	async findAll(filters?: FindAllMailDTO): Promise<MailEntity[]> {
		return this.mailRepository.findAllMailToBeSent(filters);
	}

	async updateStatus(id: string, status: MailStatus): Promise<void> {
		await this.mailRepository.partialUpdate(id, { status });
	}
}
