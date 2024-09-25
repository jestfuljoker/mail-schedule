import { EmailModule } from "@/app/email/email.module";
import { Module } from "@nestjs/common";
import { EnvModule } from './config/env/env.module';

@Module({
	imports: [EmailModule, EnvModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
