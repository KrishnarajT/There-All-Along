import React from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import { useState, useContext } from "react";

const Settings = () => {
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	return (
		<View
			className="flex flex-row justify-between p-4 px-6 rounded-full shadow-md m-4 align-middle items-center bg-accent_color"
			style={{
				borderWidth: 2,
			}}
		>
			<Text className="text-lg text-secondary">
				Change Theme
			</Text>
			<Switch
				className=""
				trackColor={{ false: "#374151", true: "#374151" }}
				thumbColor={isEnabled ? "#374151" : "#374151"}
				ios_backgroundColor="#374151"
				onValueChange={toggleSwitch}
				value={isEnabled}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default Settings;
