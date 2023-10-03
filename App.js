// import react stuff

import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React, { useEffect, useState, createContext } from "react";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import expo stuff
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

// import components
import Screen1 from "./components/screens/Screen1";
import Screen2 from "./components/screens/Screen2";
import Settings from "./components/screens/Settings.js";

// import utilities
import { colors } from "./utilities/Colors";
import MyLightTheme from "./utilities/LightTheme";
import MyDarkTheme from "./utilities/DarkTheme";
import { Ionicons } from "@expo/vector-icons";

// import contexts
import { ThemeContext } from "./context/ThemeContext";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
	const [appIsReady, setappIsReady] = useState(false);
	const scheme = useColorScheme();
	const [AppTheme, setAppTheme] = useState(
		scheme === "dark" ? MyDarkTheme : MyLightTheme
	);
	useEffect(() => {
		async function prepare() {
			try {
				// Load fonts
				await Font.loadAsync({
					"open-sans-bold": require("./assets/fonts/Bariol_Serif_Regular.otf"),
					"open-sans-regular": require("./assets/fonts/Bariol_Serif_Regular.otf"),
				});

				// do long running splash screen stuff here
			} catch (e) {
				console.warn(e);
			} finally {
				setappIsReady(true);
			}
		}
		prepare();
	}, []);
	if (!appIsReady) {
		return null;
	}
	// Hide splash screen
	SplashScreen.hideAsync();
	// setTimeout(SplashScreen.hideAsync, 5000);

	// begin code from here.
	const theme = scheme === "dark" ? MyDarkTheme : MyLightTheme;
	const toggleTheme = () => {
		setAppTheme((AppTheme) => {
			if (AppTheme.dark) {
				return MyLightTheme;
			} else {
				return MyDarkTheme;
			}
		});
	};
	const themedata = {
		AppTheme: AppTheme,
		toggleTheme: toggleTheme,
	};
	// get the color scheme of the os
	// const Stack = createNativeStackNavigator();
	const Stack = createBottomTabNavigator();
	return (
		<ThemeContext.Provider value={themedata}>
			<NavigationContainer
				theme={themedata.AppTheme}
				screenOptions={{
					headerStyle: {
						backgroundColor: "#ff3",
					},
					contentStyle: {
						backgroundColor: "#000",
					},
				}}
			>
				<StatusBar style={themedata.AppTheme.dark ? "light" : "dark"} />
				<Stack.Navigator>
					<Stack.Screen
						name="Screen1"
						component={Screen1}
						options={{
							// these are dependent on the kind of navigation you are using. check doc.
							title: "Scereern 1",
							tabBarIcon: ({ color, size }) => {
								return (
									<Ionicons
										name="ios-home"
										size={size}
										color={color}
									/>
								);
							},
						}}
					/>
					<Stack.Screen
						name="Screen2"
						component={Screen2}
						options={({ route, navigation }) => {
							return {
								title: route.params
									? route.params.some_data
									: "no data",
								tabBarIcon: () => {
									return (
										<Text
											style={{
												color: theme.colors.text,
												fontSize: 20,
											}}
										>
											👽
										</Text>
									);
								},
							};
						}}
					/>
					<Stack.Screen
						name="Settings"
						component={Settings}
						options={{
							// these are dependent on the kind of navigation you are using. check doc.
							title: "settttings 1",
							tabBarIcon: ({ color, size }) => {
								return (
									<Ionicons
										name="ios-settings"
										size={size}
										color={color}
									/>
								);
							},
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</ThemeContext.Provider>
	);
}
