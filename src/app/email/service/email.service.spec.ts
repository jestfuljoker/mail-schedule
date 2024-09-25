import {
	EmailService,
	SEND_EMAIL_SUCCESS_RESPONSE,
	SendEmailInput,
} from "@/app/email/service/email.service";
import { MailerService } from "@nestjs-modules/mailer";
import { Test } from "@nestjs/testing";

describe("EmailService", () => {
	let emailService: EmailService;
	let mailerService: MailerService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				EmailService,
				{
					provide: MailerService,
					useValue: {
						sendMail: jest.fn(),
					},
				},
			],
		}).compile();

		emailService = module.get<EmailService>(EmailService);
		mailerService = module.get<MailerService>(MailerService);
	});

	it("should be defined", () => {
		expect(emailService).toBeDefined();
		expect(mailerService).toBeDefined();
	});

	describe("sendEmail", () => {
		it("should send an email with success", async () => {
			// Arrange
			const sendEmailInput: SendEmailInput = {
				to: {
					name: "Cliente",
					address: "chris.f.assis18@gmail.com",
				},
				from: {
					address: "christofer.assis@gmail.com",
					name: "Christofer Assis",
				},
				replyTo: {
					name: "Suporte",
					address: "suporte@gmail.com",
				},
				subject: "Sua fatura chegou",
				html: "<p>Sua fatura chegou!!!</p>",
			};

			jest.spyOn(mailerService, "sendMail").mockReturnValueOnce(
				Promise.resolve({
					response: SEND_EMAIL_SUCCESS_RESPONSE,
				}),
			);

			// Act
			const result = await emailService.sendEmail(sendEmailInput);

			// Assert
			expect(result).toBeTruthy();
			expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
		});
	});
});
