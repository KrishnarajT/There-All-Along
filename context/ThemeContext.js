import React, { useState, createContext } from "react";
// import { View, StyleSheet } from "react-native";
// import MyLightTheme from "../utilities/LightTheme";
// import MyDarkTheme from "../utilities/DarkTheme";

export const ThemeContext = createContext();

// const ThemeContextProvider = (props) => {
// 	const [isDark, setIsDark] = useState(false);
// 	const [currentTheme, setcurrentTheme] = useState(MyLightTheme);

// 	const toggleDarkMode = () => {
// 		setIsDark((isDark) => {
// 			if (isDark) {
// 				setcurrentTheme(MyLightTheme);
// 			} else {
// 				setcurrentTheme(MyDarkTheme);
// 			}
// 			return !isDark;
// 		});
// 	};
// 	const value = {
// 		isDark: isDark,
// 		currentTheme: currentTheme,
// 		toggleDarkMode: toggleDarkMode,
// 	};
// 	return (
// 		<ThemeContext.Provider value={value}>
// 			{props.children}
// 		</ThemeContext.Provider>
// 	);
// };

// export default ThemeContextProvider;
