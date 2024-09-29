import { AppModule } from "@/app.module";
import { EnvironmentVariables } from "@/config/env/env-schema";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService<EnvironmentVariables>);
	const serverPort = configService.get("PORT", 3000, { infer: true });

	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	app.enableCors();

	await app.listen(serverPort);
}

bootstrap();
