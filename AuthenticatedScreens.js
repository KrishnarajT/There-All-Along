import React, {useState} from "react";
import {NavigationContainer, useNavigation, useRoute} from "@react-navigation/native";
import axios from "axios";

import {StatusBar} from "expo-status-bar";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {ServerurlContext} from "./context/ServerurlContext";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {Feather} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';

import Home from "./components/screens/Home";
import Forms from "./components/screens/Forms";
import AddFormData from "./components/screens/AddFormData";
import Settings from "./components/screens/Settings";
import Form from "./components/screens/Form";
import {AuthContext} from "./context/AuthContext";
import {createStackNavigator} from "@react-navigation/stack";
import {ThemeContext} from "./context/ThemeContext";
import {CreateFormScreen} from "./components/screens/CreateFormScreen";


const AuthenticatedScreens = (props) => {
    const route = useRoute();
    const data = route.params !== undefined ? route.params.some_data : "no data";
    const serverurl = React.useContext(ServerurlContext).serverurl;
    const {isDark, toggleDarkMode} = React.useContext(ThemeContext);
    const navigation = useNavigation();
    const {
        setUserAuthenticated,
        handleUserAuthenticated,
        userToken,
        setUserToken,
        userEmail,
        setUserEmail,
        userId,
        setUserId,
    } = React.useContext(AuthContext);

    React.useEffect(() => {
        console.log("serverurl: ", serverurl);
        console.log("user token", userToken);
        console.log("user email", userEmail);
        console.log("user id", userId);
    }, [serverurl]);

    const Drawer = createDrawerNavigator();

    return (<Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerStyle: {
                backgroundColor: "#050538",
            }, contentStyle: {
                backgroundColor: "#000",
            }, headerTintColor: "#fff", headerTitleStyle: {
                fontWeight: "bold",
            }, drawerStyle: {
                padding: 10,
            }, drawerLabelStyle: {
                fontWeight: "bold",
            }, drawerItemStyle: {
                // backgroundColor: "#000",
            }, drawerContentStyle: {
                // backgroundColor: "#000",
            }, swipeEdgeWidth: 100, swipeMinDistance: 100, swipeEnabled: true,
        }}
    >

        <Drawer.Screen
            name="Home"
            component={Home}
            options={{
                // these are dependent on the kind of navigation you are using. check doc.
                title: "Home", drawerIcon: ({color, size}) => {
                    return (<AntDesign name="home" size={size} color={color}/>);
                }
            }}
        />
        <Drawer.Screen
            name="Forms"
            component={Forms}
            options={{
                // these are dependent on the kind of navigation you are using. check doc.
                title: "Your Forms", drawerIcon: ({color, size}) => {
                    return (<AntDesign
                        name="form"
                        size={size}
                        color={color}
                    />);
                },
                headerRight: () => (<MaterialIcons.Button
                    name="add"
                    size={25}
                    backgroundColor="#050538"
                    onPress={() => {
                        navigation.navigate("CreateFormScreen");
                    }}
                />),
            }}
        />
        <Drawer.Screen
            name="AddFormData"
            component={AddFormData}
            options={{
                // these are dependent on the kind of navigation you are using. check doc.
                title: "Add Data", drawerIcon: ({color, size}) => {
                    return (<AntDesign
                        name="addfile"
                        size={size}
                        color={color}
                    />);
                },
            }}
        />

        <Drawer.Screen
            name="Settings"
            component={Settings}
            options={{
                // these are dependent on the kind of navigation you are using. check doc.
                title: "Settings", drawerIcon: ({color, size}) => {
                    return (<Feather
                        name="settings"
                        size={size}
                        color={color}
                    />);
                },
            }}
        />
        <Drawer.Screen
            name="CreateFormScreen"
            component={CreateFormScreen}
            options={{
                // these are dependent on the kind of navigation you are using. check doc.
                title: "Create Form",
                drawerItemStyle: {
                    display: "none",
                }
            }}
        />
        <Drawer.Screen
            name="FormScreen"
            component={Form}
            options={{
                // these are dependent on the kind of navigation you are using. check doc.
                title: "Form",
                drawerItemStyle: {
                    display: "none",
                }
            }}
        />

    </Drawer.Navigator>)
};

export default AuthenticatedScreens;
