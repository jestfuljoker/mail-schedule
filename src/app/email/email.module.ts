import { EmailService } from "@/app/email/service/email.service";
import { EnvironmentVariables } from "@/config/env/env-schema";
import { EnvModule } from "@/config/env/env.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EmailController } from "./email.controller";

@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [EnvModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
				transport: {
					host: configService.get("EMAIL_HOST"),
					secure: false,
					port: configService.get("EMAIL_PORT"),
					auth: {
						user: configService.get("EMAIL_USER"),
						pass: configService.get("EMAIL_PASSWORD"),
					},
					ignoreTLS: true,
				},
				defaults: {
					from: '"',
				},
			}),
		}),
	],
	providers: [EmailService],
	controllers: [EmailController],
})
export class EmailModule {}
