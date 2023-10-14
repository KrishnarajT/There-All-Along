/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./screens/**/*.{js,jsx,ts,tsx}",
		"./components/*.{js,jsx,ts,tsx}",
		"./screens/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary_color: "#050538",
				secondary_color: "#4e3dae",
				background_color: "#ebe7ee",
				text_color: "#090915",
				primary_dark_color: "#c7c7fa",
				secondary_dark_color: "#6251c2",
				background_dark_color: "#151118",
				text_dark_color: "#EAEAF6",
				neutral_color: "#27202d",
				accent_color: "#6fbe96",
			},
		},
	},
};
