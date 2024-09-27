import { MailStatus } from "@/modules/mail/enums/mail-status.enum";

export class FindAllMailDTO {
	dueDateLte: string;
	status: MailStatus;
}
