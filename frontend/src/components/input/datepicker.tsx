import { ErrorMessage } from "@hookform/error-message";
import type { InputHTMLAttributes } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFormContext } from "react-hook-form";

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
				render={({ field: { onChange, value } }) => (
					<>
						<DatePicker
							autoComplete={autocomplete}
							selected={value}
							name={name}
							onChange={(date) => onChange(date?.toISOString())}
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
