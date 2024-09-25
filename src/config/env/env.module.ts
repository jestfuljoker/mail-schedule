import { join } from "node:path";
import { validate } from "@/config/env/env-schema";
import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigModuleOptions } from "@nestjs/config";

@Module({})
export class EnvModule extends ConfigModule {
	static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
		const env = process.env.NODE_ENV || "development";

		return super.forRoot({
			...options,
			validate,
			envFilePath: [join(__dirname, "../".repeat(3), `.env.${env}`)],
		});
	}
}
