export interface SendMailResponse {
	id: string;
	body: string;
	status: string;
	subject: string;
	dueDate: string;
	createdAt: string;
	updatedAt: string;
	destinationName: string;
	deletedAt: string | null;
	destinationAddress: string;
}
