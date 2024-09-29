import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const requiredMessage = { message: "Campo obrigatório" };

const writeNowValidationSchema = z.object({
	destinationName: z.string().min(1, requiredMessage),
	destinationAddress: z.string().email({ message: "E-mail inválido" }),
	dueDate: z.string(requiredMessage).datetime({ message: "Data inválida" }),
	subject: z.string(requiredMessage).min(1, requiredMessage),
	body: z.string(requiredMessage).min(1, requiredMessage),
});

export type WriteNowValidationFormData = z.infer<typeof writeNowValidationSchema>;

export const writeNowValidation = zodResolver(writeNowValidationSchema);
