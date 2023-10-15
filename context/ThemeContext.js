import React, { useState, createContext } from "react";
export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
	const [isDark, setIsDark] = useState(false);

	const toggleDarkMode = () => {
		setIsDark((isDark) => {
			return !isDark;
		});
	};
	const value = {
		isDark: isDark,
        toggleDarkMode: toggleDarkMode,
	};
	return (
		<ThemeContext.Provider value={value}>
			{props.children}
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;
