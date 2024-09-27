import { ErrorMessage } from "@hookform/error-message";
import JoditEditor from "jodit-react";
import { Controller, useFormContext } from "react-hook-form";

interface RichTextProps {
	label: string;
	name: string;
}

export function RichText({ label, name }: RichTextProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<div className="flex flex-col">
			<label htmlFor={name}>{label}</label>
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, value, onBlur } }) => (
					<>
						<JoditEditor
							value={value}
							onBlur={(value) => {
								onBlur();
								onChange(value);
							}}
							config={{
								readonly: false,
							}}
						/>
						<ErrorMessage
							errors={errors}
							name={name}
							render={({ message }) => <span className="error-text">{message}</span>}
						/>
					</>
				)}
			/>
		</div>
	);
}
