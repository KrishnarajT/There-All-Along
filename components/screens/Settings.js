import React from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import { useState, useContext } from "react";

const Settings = () => {
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	return (
		<View
			className="flex flex-row justify-between p-4 px-6 rounded-full shadow-md m-4 align-middle items-center bg-primary_color-100"
			style={{
				borderWidth: 2,
			}}
		>
			<Text className="text-lg text-secondary">
				Change Theme
			</Text>
			<Switch
				className=""
				trackColor={{ false: "#b3c3ae", true: "#123306" }}
				thumbColor={isEnabled ? "#638cd0" : "#1461e4"}
				ios_backgroundColor="#374151"
				onValueChange={toggleSwitch}
				value={isEnabled}
			/>
		</View>
	);
};

export default Settings;
