import React, { useLayoutEffect, useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useColorScheme } from "react-native";
import MyDarkTheme from "../../utilities/DarkTheme";
import { useTheme, useNavigation, useRoute } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";

const Screen2 = (props) => {
	const navigation = useNavigation();
	const { AppTheme, toggleTheme } = useContext(ThemeContext);
	const route = useRoute();
	const data =
		route.params === undefined ? "no data" : route.params.some_data;
	const scheme = AppTheme.dark ? "dark" : "light";
	const colors = AppTheme.colors;
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
					fontFamily: "open-sans-bold",
					color: colors.text,
				}}
			>
				Screen 2 - {scheme}
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

const styles = StyleSheet.create({});

export default Screen2;
