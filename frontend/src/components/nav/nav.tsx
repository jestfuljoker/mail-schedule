import { Button } from "~/components/button";
import { NavLogo } from "~/components/nav";

export function Nav() {
	return (
		<nav className="w-full h-20 bg-gray-50 border-b border-gray-300">
			<div className="max-w-7xl m-auto h-full flex items-center justify-between">
				<NavLogo />

				<Button variant="primary">Write now</Button>
			</div>
		</nav>
	);
}
