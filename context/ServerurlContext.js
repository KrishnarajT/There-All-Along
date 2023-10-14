import React from "react";

export const ServerurlContext = React.createContext();

export const ServerurlProvider = ({ children }) => {
	const [serverurl, setServerurl] = React.useState(
		"https://long-beret-toad.cyclic.app/"
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
