import { SaveMailDTO } from "@/modules/mail/dto/save-mail.dto";
import { MailStatus } from "@/modules/mail/enums/mail-status.enum";
import { FakeMailRepository } from "@/modules/mail/repositories/mail-fake.repository";
import { MailRepository } from "@/modules/mail/repositories/mail.repository";
import { MailService } from "@/modules/mail/service/mail.service";
import { faker } from "@faker-js/faker";
import { Test } from "@nestjs/testing";

describe("MailService", () => {
	let mailService: MailService;
	let mailRepository: MailRepository;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				MailService,
				{
					provide: MailRepository,
					useClass: FakeMailRepository,
				},
			],
		}).compile();

		mailService = module.get<MailService>(MailService);
		mailRepository = module.get<MailRepository>(MailRepository);
	});

	it("should be defined", () => {
		expect(mailService).toBeDefined();
		expect(mailRepository).toBeDefined();
	});

	describe("save", () => {
		it("should save a new mail with success", async () => {
			// Arrange
			const saveMailDto: SaveMailDTO = {
				destinationName: faker.person.fullName(),
				destinationAddress: faker.internet.email(),
				dueDate: faker.date.future().toISOString(),
				subject: faker.lorem.sentence(),
				body: faker.lorem.paragraph(),
			};

			jest.spyOn(mailRepository, "create");
			jest.spyOn(mailRepository, "save");

			// Act
			const createdMail = await mailService.save(saveMailDto);

			// Assert
			expect(createdMail.id).toBeDefined();
			expect(createdMail.status).toBe(MailStatus.WAITING);
			expect(createdMail.deletedAt).toBe(null);
			expect(mailRepository.create).toHaveBeenCalledWith(saveMailDto);
			expect(mailRepository.create).toHaveBeenCalledTimes(1);
			expect(mailRepository.save).toHaveBeenCalledTimes(1);
		});
	});

	describe("findAll", () => {
		it("should return a mail list with success", async () => {
			// Arrange
			const totalMails = faker.number.int({ min: 1, max: 20 });

			await Promise.all(
				Array.from({ length: totalMails }).map(
					async () => await mailRepository.save(mailRepository.create()),
				),
			);

			// Act
			const result = await mailService.findAll();

			// Assert
			expect(result).toHaveLength(totalMails);
		});

		it("should return a filtered mail list with success", async () => {
			// Arrange
			const dueDate = faker.date.future().toISOString();
			const dateInThePast = faker.date.past({ refDate: new Date() }).toISOString();

			await Promise.all(
				Array.from({ length: 5 }).map(async (_, index) => {
					if (index % 2 === 0) {
						if (index === 2) {
							return mailRepository.save(
								mailRepository.create({ dueDate: dateInThePast, status: MailStatus.SENT }),
							);
						}

						return mailRepository.save(mailRepository.create({ dueDate: dateInThePast }));
					}

					return mailRepository.save(mailRepository.create({ dueDate }));
				}),
			);

			// Act
			const result = await mailService.findAll({
				dueDateLte: new Date().toISOString(),
				status: MailStatus.WAITING,
			});

			// Assert
			expect(result).toHaveLength(2);
		});
	});

	describe("updateStatus", () => {
		it("should update the mail status with success", async () => {
			// Arrange
			const mail = await mailRepository.save(mailRepository.create());

			// Act
			const result = await mailService.updateStatus(mail.id, MailStatus.SENT);

			// Assert
			expect(result).toBeUndefined();
		});
	});
});
