import { EnvironmentVariables } from "@/config/env/env-schema";
import { NodeMailerService } from "@/lib/node-mailer/service/node-mailer.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Module({
	imports: [
		MailerModule.forRootAsync({
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
	providers: [NodeMailerService],
	exports: [NodeMailerService],
})
export class NodeMailerModule {}
