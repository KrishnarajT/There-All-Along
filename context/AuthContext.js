import React from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = React.useState(null);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
