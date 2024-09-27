import { IsEmail, IsISO8601, IsNotEmpty, IsString } from "class-validator";

export class SaveMailDTO {
	@IsNotEmpty()
	@IsString()
	destinationName: string;

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	destinationAddress: string;

	@IsNotEmpty()
	@IsISO8601()
	dueDate: string;

	@IsNotEmpty()
	@IsString()
	subject: string;

	@IsNotEmpty()
	@IsString()
	body: string;
}
