import React, { useLayoutEffect, useContext } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const Screen2 = (props) => {
	const navigation = useNavigation();
	const route = useRoute();
	const data =
		route.params === undefined ? "no data" : route.params.some_data;
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Button
					title="Go to Settings"
					onPress={() => navigation.navigate("Settings")}
				/>
			),
		});
	}, [navigation]);
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
				Screen 2
			</Text>
			<Button
				title="Go to Screen 1"
				onPress={() =>
					navigation.navigate("Screen1", {
						some_data: "some data from screen 2",
					})
				}
			/>
			<Text>{data}</Text>
		</View>
	);
};

export default Screen2;
