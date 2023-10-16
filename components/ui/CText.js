import React from 'react';
import {Text} from 'react-native';
import {ThemeContext} from "../../context/ThemeContext";

export const CText = (props) => {
    const {isDark, toggleDarkMode} = React.useContext(ThemeContext);

    return (
        <Text className={`${isDark ? `text-text_color-500` : `text-text_dark_color-500`}`}
        >{props.children}</Text>
    )
}

