import { ErrorMessage } from "@hookform/error-message";
import type { InputHTMLAttributes } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale/pt-BR";
import { Controller, useFormContext } from "react-hook-form";

registerLocale("pt-BR", ptBR);

type DatePickerInputProps = {
	label: string;
	name: string;
	autocomplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
};

export function DatePickerInput({ label, name, autocomplete }: DatePickerInputProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<>
			<label htmlFor={name}>{label}</label>
			<Controller
				name={name}
				control={control}
				defaultValue={new Date(new Date().setMinutes(0)).toISOString()}
				render={({ field: { onChange, value } }) => (
					<>
						<DatePicker
							autoComplete={autocomplete}
							showTimeSelect
							locale="pt-BR"
							selected={new Date(value)}
							name={name}
							onChange={(date) => onChange(date?.toISOString())}
							dateFormat="Pp"
							onKeyDown={(event) => event.preventDefault()}
						/>
						<ErrorMessage
							errors={errors}
							name={name}
							render={({ message }) => <span className="error-text">{message}</span>}
						/>
					</>
				)}
			/>
		</>
	);
}
