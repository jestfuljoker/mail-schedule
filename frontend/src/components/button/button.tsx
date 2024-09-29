import classNames from "classnames";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variants = "primary" | "default" | "light" | "dark";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: Variants;
}

const VARIANTS: Record<Variants, string> = {
	primary: "bg-primary text-white hover:bg-primary-light active:bg-primary-dark transition-all",
	default: "text-black",
	light: "bg-primary-light text-white hover:bg-primary active:bg-primary-dark transition-all",
	dark: "bg-primary-dark text-white hover:bg-primary active:bg-primary-light transition-all",
};

export function Button({ children, type, variant = "default", ...props }: ButtonProps) {
	return (
		<button
			type={type ?? "button"}
			className={classNames("py-2 px-4 rounded-md text-sm focus:outline-none", VARIANTS[variant])}
			{...props}
		>
			{children}
		</button>
	);
}
