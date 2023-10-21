import React, {useState} from "react";
import {View, Text, TextInput, ScrollView, Alert} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ServerurlContext} from "../../context/ServerurlContext";
import {ThemeContext} from "../../context/ThemeContext";
import axios from "axios";
import {StatusBar} from "expo-status-bar";
import {Button, Dialog, Searchbar} from 'react-native-paper';
import DialogDisplay from "../ui/Dialog";
import {AuthContext} from "../../context/AuthContext";

const Forms = (props) => {
    const route = useRoute();
    const navigation = useNavigation();
    const serverurl = React.useContext(ServerurlContext).serverurl;
    const {isDark, toggleDarkMode} = React.useContext(ThemeContext);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [forms, setForms] = React.useState([]);
    const {
        setUserAuthenticated, userToken, setUserToken, userEmail, setUserEmail, userId, setUserId,
    } = React.useContext(AuthContext);

    React.useEffect(() => {
        console.log("serverurl: ", serverurl);
        // get data from server using axios get request
        axios
            .get(serverurl + "db/get_forms", {
                    params: {
                        token: userToken
                    },
                }
            )
            .then((response) => {
                console.log("response.data: ", response.data);
            })
            .catch((error) => {
                console.log("error: ", error);
                // Show an alert that there is some error for 2 seconds.
                Alert.alert("Server Error!", "Please try Later", [{
                    text: "Sorry!! Error Connecting to the Server, Please Try again later.",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                }, {text: "OK", onPress: () => console.log("OK Pressed")},]);
            });
    }, [serverurl]);
    return (<View
        className={`flex-1 ${isDark ? `bg-background_dark_color-500` : `bg-background_color-500`}`}
    >
        <StatusBar
            animated={true}
            style={isDark ? "dark" : "light"}
        />
        <Searchbar
            placeholder="Search for your Forms"
            onChangeText={(e) => {
                setSearchQuery(e)
            }}
            value={searchQuery}
            className={`m-4 ${isDark ? `bg-background_dark_color-500` : `bg-secondary_color-200`}`}
        />
        {/*<DialogDisplay title="Dialog Title" body="Dialog Body" visible={false}/>*/}

        <ScrollView
            className="flex-1 "
        >

        </ScrollView>
    </View>);
};

export default Forms;
