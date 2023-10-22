// import react stuff
import React, {useEffect, useState, createContext, useContext} from "react";
import {
    NavigationContainer, DefaultTheme, DarkTheme,
} from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createStackNavigator} from '@react-navigation/stack';

// import expo stuff
import {StatusBar} from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

// import components

// import utilities

// import contexts
import {
    ServerurlProvider,
} from "./context/ServerurlContext";
import ThemeContextProvider from "./context/ThemeContext";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import AuthenticatedScreens from "./AuthenticatedScreens";
import {AuthProvider} from "./context/AuthContext";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [userAuthenticated, setUserAuthenticated] = React.useState(false);

    const handleUserAuthenticated = (userAuthenticated) => {
        console.log("handleUserAuthenticated: " + userAuthenticated)
        console.log("triggered in main by something else. ")
        setUserAuthenticated(userAuthenticated);
    }
    useEffect(() => {
        async function prepare() {
            try {
                // do long-running splash screen stuff here
                console.log("doing some long running task here. ");
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
                await SplashScreen.hideAsync();
            }
        }

        prepare().then(r => console.log("prepare() done"));
    }, [userAuthenticated]);
    if (!appIsReady) {
        return null;
    }
    // Hide splash screen
    SplashScreen.hideAsync();

    // general purpose stack navigator
    const Stack = createStackNavigator();

    // -- begin code from here. --

    // if the user is authenticated
    if (userAuthenticated) {
        return (<ServerurlProvider>
            <ThemeContextProvider>
                <AuthProvider>
                    <NavigationContainer
                    >
                        <Stack.Navigator initialRouteName="App"
                                         screenOptions={{
                                             headerShown: false,
                                         }}
                        >
                            <Stack.Screen
                                name="AuthScreens"
                                component={AuthenticatedScreens}
                                options={{
                                    headerShown: false,
                                }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </AuthProvider>
            </ThemeContextProvider>
        </ServerurlProvider>)
    }

    // if the user is not authenticated
    return <ServerurlProvider>
        <ThemeContextProvider>
            <AuthProvider>
                <NavigationContainer>

                    <Stack.Navigator initialRouteName="Login"
                                     screenOptions={{
                                         headerShown: false,
                                         handleUserAuthenticated: handleUserAuthenticated,
                                     }}
                    >
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{
                                headerShown: false,
                            }}
                            initialParams={{
                                data: "hi", handleUserAuthenticated: handleUserAuthenticated,
                            }}
                        />
                        <Stack.Screen
                            name="Signup"
                            component={Signup}
                            options={{
                                headerShown: false,
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthProvider>
        </ThemeContextProvider>
    </ServerurlProvider>
}
