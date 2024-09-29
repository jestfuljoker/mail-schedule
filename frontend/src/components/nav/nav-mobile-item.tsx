import classNames from "classnames";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variants = "default" | "primary";

interface NavMobileItemProps {
	children: ReactNode;
	variant?: Variants;
	to: string;
	onClick?: () => void;
}

const variants: Record<Variants, string> = {
	default: "bg-white text-black hover:bg-gray-100 active:bg-gray-200 transition-all",
	primary: "bg-primary text-white hover:bg-primary-light active:bg-primary-dark transition-all",
};

export function NavMobileItem({ onClick, to, children, variant = "default" }: NavMobileItemProps) {
	return (
		<Link to={to} onClick={onClick}>
			<div className={classNames("w-full p-4 border-b border-gray-100", variants[variant])}>
				{children}
			</div>
		</Link>
	);
}
