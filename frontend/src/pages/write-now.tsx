import { FormProvider, useForm } from "react-hook-form";
import { Button } from "~/components/button";
import { DatePickerInput, Input, RichText } from "~/components/input";
import { Nav } from "~/components/nav";
import { type WriteNowValidationFormData, writeNowValidation } from "~/validations";

export function WriteNowPage() {
	const formMethods = useForm<WriteNowValidationFormData>({
		resolver: writeNowValidation,
	});

	function onSubmit(data: WriteNowValidationFormData) {
		console.log(data);
	}

	return (
		<>
			<Nav />
			<div className="container">
				<h1>Escrever Agora</h1>

				<FormProvider {...formMethods}>
					<form className="form" onSubmit={formMethods.handleSubmit(onSubmit)}>
						<Input name="destinationName" label="Full name" autoComplete="name" />

						<Input name="destinationAddress" label="E-mail" type="email" autoComplete="email" />

						<DatePickerInput name="dueDate" label="Date" autocomplete="bday-day webauthn" />

						<Input name="subject" label="Subject" />

						<RichText name="body" label="Content" />

						<Button type="submit" variant="primary">
							Send
						</Button>
					</form>
				</FormProvider>
			</div>
		</>
	);
}
