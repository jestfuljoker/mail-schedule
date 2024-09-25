import { EmailService } from "@/app/email/service/email.service";
import { MailerModule } from "@nestjs-modules/mailer";

import { Module } from "@nestjs/common";

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: "smtp.mailgun.org",
				secure: false,
				port: 587,
				auth: {
					user: "postmaster@sandboxa8912999cabc4f35816e99117f9d3f3b.mailgun.org",
					pass: "14f4c616825c48ac95a062784e02776e-1b5736a5-45712362",
				},
				ignoreTLS: true,
			},
			defaults: {
				from: '"',
			},
		}),
	],
	providers: [EmailService],
})
export class EmailModule {}
