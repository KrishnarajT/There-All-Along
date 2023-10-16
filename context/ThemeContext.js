import React, {useState, createContext} from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
    const [isDark, setIsDark] = useState(false);
    const toggleDarkMode = () => {
        setIsDark((isDark) => {
            return !isDark;
        });
        if (isDark) {
            console.log("Dark Mode Enabled")
        } else {
            console.log("Dark Mode Disabled")
        }
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
