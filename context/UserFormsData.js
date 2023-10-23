import React from "react";

export const FormsDataContext = React.createContext();

export const FormsDataContextProvider = ({ children }) => {
    const [useForms, setUserForms] = React.useState(
        []
    );

    return (
        <FormsDataContext.Provider
            value={{
                useForms,
                setUserForms,
            }}
        >
            {children}
        </FormsDataContext.Provider>
    );
};
