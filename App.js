// import react stuff

import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React, { useEffect, useState, createContext, useContext } from "react";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

// import expo stuff
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

// import components
import Screen1 from "./components/screens/Screen1";
import Screen2 from "./components/screens/Screen2";
import Settings from "./components/screens/Settings.js";

// import utilities
import { Ionicons } from "@expo/vector-icons";

// import contexts
import {
	ServerurlProvider,
} from "./context/ServerurlContext";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
	const [appIsReady, setappIsReady] = useState(false);
	useEffect(() => {
		async function prepare() {
			try {
				// do long running splash screen stuff here
				console.log("doing some long runnning task here. ");
			} catch (e) {
				console.warn(e);
			} finally {
				setappIsReady(true);
				SplashScreen.hideAsync();
			}
		}
		prepare();
	}, []);
	if (!appIsReady) {
		return null;
	}
	// Hide splash screen
	SplashScreen.hideAsync();

	// begin code from here.

	const Drawer = createDrawerNavigator();
	return (
		<ServerurlProvider>
			<NavigationContainer
				screenOptions={{
					headerStyle: {
						backgroundColor: "#ff3",
					},
					contentStyle: {
						backgroundColor: "#000",
					},
				}}
			>
				<StatusBar />
				<Drawer.Navigator>
					<Drawer.Screen
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
					<Drawer.Screen
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
					<Drawer.Screen
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
				</Drawer.Navigator>
			</NavigationContainer>
		</ServerurlProvider>
	);
}
