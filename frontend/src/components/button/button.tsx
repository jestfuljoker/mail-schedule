import classNames from "classnames";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variants = "primary" | "default" | "light" | "dark";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: Variants;
}

const VARIANTS: Record<Variants, string> = {
	primary: "bg-primary text-white hover:bg-primary-light active:bg-primary-dark transition-all",
	default: "text-black border border-transparent hover:border-primary transition-all",
	light: "bg-primary-light text-white hover:bg-primary active:bg-primary-dark transition-all",
	dark: "bg-primary-dark text-white hover:bg-primary active:bg-primary-light transition-all",
};

export function Button({ children, type, variant = "default", ...props }: ButtonProps) {
	return (
		<button
			type={type ?? "button"}
			{...props}
			className={classNames(
				"py-2 px-4 rounded-md font-semibold focus:outline-none",
				VARIANTS[variant],
			)}
		>
			{children}
		</button>
	);
}
