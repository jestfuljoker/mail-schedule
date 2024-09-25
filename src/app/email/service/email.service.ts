import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

export interface SendEmailInput extends ISendMailOptions {}

@Injectable()
export class EmailService {
	constructor(private readonly mailerService: MailerService) {}

	async sendEmail(input: SendEmailInput): Promise<boolean> {
		const response = await this.mailerService.sendMail(input);

		return !!response;
	}
}
