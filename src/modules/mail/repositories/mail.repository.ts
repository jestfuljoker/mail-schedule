import { FindAllMailDTO } from "@/modules/mail/dto/find-all-mail.dto";
import { MailEntity } from "@/modules/mail/mail.entity";
import { GenericRepository } from "@/shared/repositories/generic-repository";

export abstract class MailRepository extends GenericRepository<MailEntity> {
	abstract findAllMailToBeSent(filter?: FindAllMailDTO): Promise<MailEntity[]>;
}
