import { SendEmailResponse } from "@/lib/node-mailer/interfaces/send-email-response.interface";
import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

export const SEND_EMAIL_SUCCESS_RESPONSE = "250 Great success";

export interface SendEmailInput extends ISendMailOptions {}

@Injectable()
export class NodeMailerService {
	constructor(private readonly mailerService: MailerService) {}

	async sendEmail(input: SendEmailInput): Promise<boolean> {
		const { response } = (await this.mailerService.sendMail(input)) as SendEmailResponse;

		return response.includes(SEND_EMAIL_SUCCESS_RESPONSE);
	}
}
