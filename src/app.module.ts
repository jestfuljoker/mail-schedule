import { join } from "node:path";
import { EnvironmentVariables, validate } from "@/config/env/env-schema";
import { MailModule } from "@/modules/mail/mail.module";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate,
			envFilePath: [join(__dirname, "..", `.env.${process.env.NODE_ENV}`)],
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService<EnvironmentVariables>) => {
				return {
					type: "postgres",
					database: configService.get("DB_NAME"),
					username: configService.get("DB_USER"),
					password: configService.get("DB_PASSWORD"),
					host: configService.get("DB_HOST", "localhost"),
					port: configService.get("DB_PORT", 5432),
					autoLoadEntities: true,
					entities: [`${__dirname}/**/*.entity{.ts,.js}`],
				};
			},
		}),
		ScheduleModule.forRoot(),
		MailModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
