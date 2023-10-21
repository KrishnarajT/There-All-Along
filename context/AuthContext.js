import React from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [userId, setUserId] = React.useState(null);
	const [userEmail, setUserEmail] = React.useState(null);
	const [userAuthenticated, setUserAuthenticated] = React.useState(false);
	const [userToken, setUserToken] = React.useState(null);


	return (
		<AuthContext.Provider
			value={{
				userId,
				setUserId,
				userEmail,
				setUserEmail,
				userAuthenticated,
				setUserAuthenticated,
				userToken,
				setUserToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
