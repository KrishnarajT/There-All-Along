import React from "react";

export const ServerurlContext = React.createContext();

export const ServerurlProvider = ({ children }) => {
	const [serverurl, setServerurl] = React.useState(
		"http://192.168.1.39:8000/"
	);

	return (
		<ServerurlContext.Provider
			value={{
				serverurl,
				setServerurl,
			}}
		>
			{children}
		</ServerurlContext.Provider>
	);
};
