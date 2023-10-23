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
    const [forms, setForms] = React.useState(null);
    const {
        setUserAuthenticated, userToken, setUserToken, userEmail, setUserEmail, userId, setUserId,
    } = React.useContext(AuthContext);

    React.useEffect(() => {
        console.log("server Url: ", serverurl);
        console.log("userToken: ", userToken)
        console.log("Forms are: ", forms)
        // get data from server using axios get request
        axios
            .post(serverurl + "db/get_forms", {
                token: userToken,
            })
            .then((response) => {
                console.log("response.data: ", response.data);
                setForms(response.data);
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
            {forms ? forms.filter((form) => {
                return form.name.toLowerCase().includes(searchQuery.toLowerCase())
            }).map((form, index) => {
                return (<View
                        key={index}
                        className={`m-4 p-4 border rounded-lg ${isDark ? `bg-background_dark_color-500` : `bg-secondary_color-200`}`}
                    >
                        <Text
                            className={`text-lg font-bold ${isDark ? `text-white` : `text-black`}`}
                        >
                            {form.name}
                        </Text>
                        <Text
                            className={`text-sm ${isDark ? `text-white` : `text-black`}`}
                        >
                            {form.description}
                        </Text>
                        <Button
                            mode="contained"
                            onPress={() => {
                                navigation.navigate("Form", {
                                    formId: form.id,
                                })
                            }}
                            className={`mt-4 ${isDark ? `bg-primary_color-500` : `bg-primary_color-300`}`}
                        >
                            Open
                        </Button>
                    </View>)
            }) : <Text>No Forms Found</Text>

            }
        </ScrollView>
    </View>);
};

export default Forms;
