import React from "react";

export const FormsDataContext = React.createContext();

export const FormsDataContextProvider = ({ children }) => {
    const [userForms, setUserForms] = React.useState(
        []
    );

    return (
        <FormsDataContext.Provider
            value={{
                userForms,
                setUserForms,
            }}
        >
            {children}
        </FormsDataContext.Provider>
    );
};
