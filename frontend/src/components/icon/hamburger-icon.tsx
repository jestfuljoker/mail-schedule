interface HamburgerIconProps {
	width?: number | string;
	height?: number | string;
	fill?: string;
}

export function HamburgerIcon({ height = 25, width = 18, fill = "#333333" }: HamburgerIconProps) {
	return (
		<div style={{ width, height }}>
			<svg
				style={{ width: "inherit", height: "inherit" }}
				role="img"
				aria-label="Hamburger menu"
				viewBox="0 0 25 18"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect width="25" height="3" fill={fill} />
				<rect y="7" width="25" height="3" fill={fill} />
				<rect y="14" width="25" height="3" fill={fill} />
			</svg>
		</div>
	);
}
