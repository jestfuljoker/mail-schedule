import { SaveMailDTO } from "@/modules/mail/dto/save-mail.dto";
import { MailEntity } from "@/modules/mail/mail.entity";
import { MailRepository } from "@/modules/mail/repositories/mail.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
	constructor(private readonly mailRepository: MailRepository) {}

	async save(saveMailDTO: SaveMailDTO): Promise<MailEntity> {
		return this.mailRepository.save(this.mailRepository.create(saveMailDTO));
	}
}
