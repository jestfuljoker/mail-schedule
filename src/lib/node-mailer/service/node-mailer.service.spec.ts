import {
	NodeMailerService,
	SEND_EMAIL_SUCCESS_RESPONSE,
	SendEmailInput,
} from "@/lib/node-mailer/service/node-mailer.service";
import { MailerService } from "@nestjs-modules/mailer";
import { Test } from "@nestjs/testing";

describe("EmailService", () => {
	let nodeMailerService: NodeMailerService;
	let mailerService: MailerService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				NodeMailerService,
				{
					provide: MailerService,
					useValue: {
						sendMail: jest.fn(),
					},
				},
			],
		}).compile();

		nodeMailerService = module.get<NodeMailerService>(NodeMailerService);
		mailerService = module.get<MailerService>(MailerService);
	});

	it("should be defined", () => {
		expect(nodeMailerService).toBeDefined();
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
			const result = await nodeMailerService.sendEmail(sendEmailInput);

			// Assert
			expect(result).toBeTruthy();
			expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
		});
	});
});
