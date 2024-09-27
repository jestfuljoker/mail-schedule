import { ErrorMessage } from "@hookform/error-message";
import { type InputHTMLAttributes, forwardRef } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ name, label, ...props }: InputProps, ref) => {
		const {
			register,
			formState: { errors },
		} = useFormContext();

		const { ref: registerRef, ...inputRegister } = register(name);

		return (
			<>
				<label htmlFor={name}>{label}</label>
				<input {...props} {...inputRegister} ref={ref || registerRef} />
				<ErrorMessage
					errors={errors}
					name={name}
					render={({ message }) => <span className="error-text">{message}</span>}
				/>
			</>
		);
	},
);
