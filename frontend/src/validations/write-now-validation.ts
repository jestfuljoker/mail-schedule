import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const requiredMessage = { message: "Required field" };

const writeNowValidationSchema = z.object({
	destinationName: z.string().min(1, requiredMessage),
	destinationAddress: z.string().email({ message: "Invalid email address" }),
	dueDate: z.string(requiredMessage).datetime({ message: "Invalid date" }),
	subject: z.string(requiredMessage).min(1, requiredMessage),
	body: z.string(requiredMessage).min(1, requiredMessage),
});

export type WriteNowValidationFormData = z.infer<typeof writeNowValidationSchema>;

export const writeNowValidation = zodResolver(writeNowValidationSchema);
