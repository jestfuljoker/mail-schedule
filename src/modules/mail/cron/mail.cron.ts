import { NodeMailerService } from "@/lib/node-mailer/service/node-mailer.service";
import { MailStatus } from "@/modules/mail/enums/mail-status.enum";
import { MailService } from "@/modules/mail/service/mail.service";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class MailCron {
	private readonly logger = new Logger(MailCron.name);

	constructor(
		private readonly mailService: MailService,
		private readonly nodeMailerService: NodeMailerService,
	) {}

	@Cron(CronExpression.EVERY_10_SECONDS)
	async handler() {
		const mails = await this.mailService.findAll({
			dueDateLte: new Date().toISOString(),
			status: MailStatus.WAITING,
		});

		if (mails.length === 0) {
			return;
		}

		await Promise.all(
			mails.map(async (mail) => {
				const emailSent = await this.nodeMailerService.sendEmail({
					to: {
						name: mail.destinationName,
						address: mail.destinationAddress,
					},
					from: {
						address: "christofer.assis@gmail.com",
						name: "Christofer Assis",
					},
					replyTo: {
						name: "Suporte",
						address: "suporte@gmail.com",
					},
					subject: mail.subject,
					html: mail.body,
				});

				await this.mailService.updateStatus(
					mail.id,
					emailSent ? MailStatus.SENT : MailStatus.FAILED,
				);

				this.logger.log(`Email with id: "${mail.id}" was successfully sent!`);
			}),
		);
	}
}
