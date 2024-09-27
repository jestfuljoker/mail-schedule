import { MailStatus } from "@/modules/mail/enums/mail-status.enum";
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("mails")
export class MailEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ name: "destination_name" })
	destinationName: string;

	@Column({ name: "destination_address" })
	destinationAddress: string;

	@Column({ name: "subject" })
	subject: string;

	@Column({ name: "due_date", type: "timestamp" })
	dueDate: string;

	@Column({ default: MailStatus.WAITING, type: "enum", enum: MailStatus })
	status: MailStatus;

	@Column({ type: "text" })
	body: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: string;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: string;

	@DeleteDateColumn({ name: "deleted_at", nullable: true })
	deletedAt: string | null;
}
