/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-light": "hsla(212,100%,85%,1)",
				primary: "hsla(212,100%,65%,1)",
				"primary-dark": "hsla(212,100%,25%,1)",
			},
		},
	},
	plugins: [],
};
