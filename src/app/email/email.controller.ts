import { EmailService, SendEmailInput } from "@/app/email/service/email.service";
import { Body, Controller, Post } from "@nestjs/common";

@Controller("api/v1/email")
export class EmailController {
	constructor(private readonly emailService: EmailService) {}

	@Post()
	async sendEmail(@Body() input: SendEmailInput) {
		return this.emailService.sendEmail(input);
	}
}
