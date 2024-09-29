import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "~/components/button";
import { HamburgerIcon } from "~/components/icon";
import { NavLogo, NavMobileItem } from "~/components/nav";

export function Nav() {
	const [isMenuMobileVisible, setIsMenuMobileVisible] = useState(false);

	function handleLinkClick() {
		setIsMenuMobileVisible(false);
	}

	return (
		<nav className="w-full h-20 bg-gray-50 border-b border-gray-300">
			<div className="max-w-7xl m-auto h-full flex items-center justify-between px-4">
				<NavLogo />

				<div className="hidden lg:flex gap-4 items-center">
					<Link to="/dashboard">
						<Button>Dashboard</Button>
					</Link>

					<Link to="/contacts">
						<Button>Contatos</Button>
					</Link>

					<Link to="/emails">
						<Button>E-mails</Button>
					</Link>

					<Link to="/write-now">
						<Button variant="primary">Escrever agora</Button>
					</Link>
				</div>

				<div className="flex lg:hidden">
					<Button onClick={() => setIsMenuMobileVisible((prev) => !prev)}>
						{isMenuMobileVisible ? (
							<span className="font-semibold text-2xl">X</span>
						) : (
							<HamburgerIcon />
						)}
					</Button>
				</div>
			</div>

			{isMenuMobileVisible && (
				<div className="w-full h-[calc(100vh-81px)] fixed top-20 left-0 bg-white">
					<div className="flex flex-col items-stretch justify-center">
						<NavMobileItem to="/dashboard" onClick={handleLinkClick}>
							Dashboard
						</NavMobileItem>

						<NavMobileItem to="/contacts" onClick={handleLinkClick}>
							Contatos
						</NavMobileItem>

						<NavMobileItem to="/emails" onClick={handleLinkClick}>
							E-mails
						</NavMobileItem>

						<NavMobileItem to="/write-now" onClick={handleLinkClick} variant="primary">
							Escrever agora
						</NavMobileItem>
					</div>
				</div>
			)}
		</nav>
	);
}
