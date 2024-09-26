import { NodeMailerService } from "@/lib/node-mailer/service/node-mailer.service";
import { MailCron } from "@/modules/mail/cron/mail.cron";
import { MailEntity } from "@/modules/mail/mail.entity";
import { MailService } from "@/modules/mail/service/mail.service";
import { faker } from "@faker-js/faker";
import { Test } from "@nestjs/testing";

describe("MailCron", () => {
	let mailCron: MailCron;
	let mailService: MailService;
	let nodeMailerService: NodeMailerService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				MailCron,
				{
					provide: MailService,
					useValue: {
						findAll: jest.fn(),
						updateStatus: jest.fn(),
					},
				},
				{
					provide: NodeMailerService,
					useValue: {
						sendEmail: jest.fn(),
					},
				},
			],
		}).compile();

		mailCron = module.get<MailCron>(MailCron);
		mailService = module.get<MailService>(MailService);
		nodeMailerService = module.get<NodeMailerService>(NodeMailerService);
	});

	it("should be defined", () => {
		expect(mailCron).toBeDefined();
		expect(mailService).toBeDefined();
		expect(nodeMailerService).toBeDefined();
	});

	describe("handler", () => {
		it("should send mail every 10 seconds", async () => {
			// Arrange
			const mailEntityMockList = [
				{
					id: faker.string.uuid(),
					dueDate: new Date().toISOString(),
				},
				{
					id: faker.string.uuid(),
					dueDate: new Date().toISOString(),
				},
			] as MailEntity[];

			jest.spyOn(mailService, "findAll").mockResolvedValueOnce(mailEntityMockList);
			jest.spyOn(mailService, "updateStatus").mockResolvedValueOnce();
			jest.spyOn(nodeMailerService, "sendEmail").mockResolvedValueOnce(true);

			// Act
			const result = await mailCron.handler();

			// Assert
			expect(result).toBeUndefined();
			expect(mailService.findAll).toHaveBeenCalledTimes(1);
			expect(mailService.updateStatus).toHaveBeenCalledTimes(2);
			expect(nodeMailerService.sendEmail).toHaveBeenCalledTimes(2);
		});
	});
});
