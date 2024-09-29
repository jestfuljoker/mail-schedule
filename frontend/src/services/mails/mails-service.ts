import { HttpClient } from "~/services/http-client";
import type { SendMailResponse } from "~/services/mails";
import type { WriteNowValidationFormData } from "~/validations";

class MailsService {
	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient(import.meta.env.VITE_API_BASE_URL);
	}

	async sendEmail(data: WriteNowValidationFormData) {
		return this.httpClient.post<SendMailResponse>("/api/v1/mails", data);
	}
}

export const mailsService = new MailsService();
