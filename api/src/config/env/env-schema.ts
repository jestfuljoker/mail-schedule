import { Transform, plainToInstance } from "class-transformer";
import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
	validateSync,
} from "class-validator";

export enum NodeEnv {
	DEVELOPMENT = "development",
	PRODUCTION = "production",
	TEST = "test",
}

export class EnvironmentVariables {
	@IsEnum(NodeEnv)
	NODE_ENV: NodeEnv;

	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(65535)
	@Transform(({ value }) => Number.parseInt(value, 10))
	PORT?: number;

	@IsString()
	@IsNotEmpty()
	EMAIL_USER: string;

	@IsString()
	@IsNotEmpty()
	EMAIL_PASSWORD: string;

	@IsString()
	@IsNotEmpty()
	EMAIL_HOST: string;

	@IsNumber()
	@Min(0)
	@Max(65535)
	@Transform(({ value }) => Number.parseInt(value, 10))
	EMAIL_PORT: number;

	@IsString()
	@IsNotEmpty()
	DB_USER: string;

	@IsString()
	@IsNotEmpty()
	DB_PASSWORD: string;

	@IsString()
	@IsNotEmpty()
	DB_NAME: string;

	@IsString()
	@IsOptional()
	DB_HOST?: string;

	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(65535)
	@Transform(({ value }) => Number.parseInt(value, 10))
	DB_PORT?: number;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	});

	const errors = validateSync(validatedConfig, { skipMissingProperties: false });

	if (errors.length > 0) {
		throw new Error(`Missing environment variables: ${errors.toString()}`);
	}

	return validatedConfig;
}
