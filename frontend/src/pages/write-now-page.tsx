import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/button";
import { DatePickerInput, Input, RichText } from "~/components/input";
import { Nav } from "~/components/nav";
import { mailsService } from "~/services/mails";
import { type WriteNowValidationFormData, writeNowValidation } from "~/validations";

export function WriteNowPage() {
	const formMethods = useForm<WriteNowValidationFormData>({
		resolver: writeNowValidation,
		defaultValues: {
			body: "",
			destinationAddress: "",
			destinationName: "",
			subject: "",
		},
	});

	async function onSubmit(data: WriteNowValidationFormData) {
		const response = await mailsService.sendEmail(data);

		if (response) {
			formMethods.reset();
			toast.success("Mensagem programada para ser enviada com sucesso!");
		}
	}

	return (
		<>
			<Nav />
			<div className="container">
				<h1>Escrever Agora</h1>

				<FormProvider {...formMethods}>
					<form className="form" onSubmit={formMethods.handleSubmit(onSubmit)}>
						<Input name="destinationName" label="Nome completo" autoComplete="name" />

						<Input name="destinationAddress" label="E-mail" type="email" autoComplete="email" />

						<DatePickerInput
							name="dueDate"
							label="Data de envio"
							autocomplete="bday-day webauthn"
						/>

						<Input name="subject" label="Assunto" />

						<RichText name="body" label="Conteúdo" />

						<Button type="submit" variant="primary">
							Enviar
						</Button>
					</form>
				</FormProvider>
			</div>
		</>
	);
}
