import { MailController } from "@/modules/mail/mail.controller";
import { MailEntity } from "@/modules/mail/mail.entity";
import { TypeormMailRepository } from "@/modules/mail/repositories/mail-typeorm.repository";
import { MailRepository } from "@/modules/mail/repositories/mail.repository";
import { MailService } from "@/modules/mail/service/mail.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([MailEntity])],
	providers: [
		MailService,
		{
			provide: MailRepository,
			useClass: TypeormMailRepository,
		},
	],
	controllers: [MailController],
})
export class MailModule {}
