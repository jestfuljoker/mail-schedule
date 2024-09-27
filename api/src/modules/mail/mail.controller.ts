import { SaveMailDTO } from "@/modules/mail/dto/save-mail.dto";
import { MailService } from "@/modules/mail/service/mail.service";
import { Body, Controller, Post } from "@nestjs/common";

@Controller("api/v1/mails")
export class MailController {
	constructor(private readonly mailService: MailService) {}

	@Post()
	async save(@Body() saveMailDto: SaveMailDTO) {
		return this.mailService.save(saveMailDto);
	}
}
