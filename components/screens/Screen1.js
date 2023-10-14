import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const Screen1 = (props) => {
	const route = useRoute();
	const data =
		route.params !== undefined ? route.params.some_data : "no data";
	const navigation = useNavigation();

	return (
		<View>
			<Text
				style={{
					fontSize: 20,
					fontWeight: "bold",
					textAlign: "center",
					marginTop: 20,
				}}
			>
				Screen 1
			</Text>
			<Button
				title="Go to Screen 2"
				onPress={() =>
					navigation.navigate("Screen2", {
						some_data: "some data from screen 1",
					})
				}
			/>
			<Text>{data}</Text>
		</View>
	);
};

export default Screen1;
