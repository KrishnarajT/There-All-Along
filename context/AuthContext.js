import React from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = React.useState(null);
	const [userAuthenticated, setUserAuthenticated] = React.useState(false);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				userAuthenticated,
				setUserAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
