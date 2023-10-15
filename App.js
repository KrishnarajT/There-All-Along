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

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export const AuthContext = React.createContext();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [user, setUser] = React.useState(null);
    const [userAuthenticated, setUserAuthenticated] = React.useState(false);

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
    }, []);
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
                <AuthContext.Provider value={{
                    user, setUser, userAuthenticated, setUserAuthenticated,
                }}>
                    <NavigationContainer
                    >
                        <StatusBar/>
                        <Stack.Navigator initialRouteName="App"
                                         screenOptions={{
                                             headerShown: false,
                                         }}
                        >
                            <Stack.Screen
                                name="Login"
                                component={AuthenticatedScreens}
                                options={{
                                    headerShown: false,
                                }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </AuthContext.Provider>
            </ThemeContextProvider>
        </ServerurlProvider>)
    }

    // if the user is not authenticated
    return <ServerurlProvider>
        <ThemeContextProvider>
            <AuthContext.Provider value={{
                user, setUser, userAuthenticated, setUserAuthenticated,
            }}>
                <NavigationContainer>
                    <StatusBar/>
                    <Stack.Navigator initialRouteName="Login"
                                     screenOptions={{
                                         headerShown: false,
                                     }}
                    >
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{
                                headerShown: false,
                            }}
                            initialParams={{data: "hi"}}
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
            </AuthContext.Provider>
        </ThemeContextProvider>
    </ServerurlProvider>
}
