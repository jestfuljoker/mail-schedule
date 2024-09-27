import { NodeMailerModule } from "@/lib/node-mailer/node-mailer.module";
import { MailCron } from "@/modules/mail/cron/mail.cron";
import { MailController } from "@/modules/mail/mail.controller";
import { MailEntity } from "@/modules/mail/mail.entity";
import { TypeormMailRepository } from "@/modules/mail/repositories/mail-typeorm.repository";
import { MailRepository } from "@/modules/mail/repositories/mail.repository";
import { MailService } from "@/modules/mail/service/mail.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([MailEntity]), NodeMailerModule],
	providers: [
		MailService,
		{
			provide: MailRepository,
			useClass: TypeormMailRepository,
		},
		MailCron,
	],
	controllers: [MailController],
})
export class MailModule {}
