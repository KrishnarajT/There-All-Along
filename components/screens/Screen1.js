import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useColorScheme } from "react-native";
import MyDarkTheme from "../../utilities/DarkTheme";
import { useTheme, useNavigation, useRoute } from "@react-navigation/native";

const Screen1 = (props) => {
    const route = useRoute();
    const data = route.params !== undefined ? route.params.some_data : "no data";
	const navigation = useNavigation();
	const scheme = useTheme().dark ? "dark" : "light";
	const colors = useTheme().colors;

	return (
		<View>
			<Text
				style={{
					fontFamily: "open-sans-bold",
					color: colors.text,
				}}
			>
				Screen 1 - {scheme}
			</Text>
			<Button
				title="Go to Screen 2"
                onPress={() => navigation.navigate("Screen2", {
                    some_data : "some data from screen 1",
                })}
            />
            <Text>
                {data}
            </Text>
            
		</View>
	);
};

const styles = StyleSheet.create({});

export default Screen1;
