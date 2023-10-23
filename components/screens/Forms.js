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
import Svg, {SvgUri} from "react-native-svg";
import {FormsDataContext} from "../../context/UserFormsData";

const Forms = ({navigation}) => {
    const route = useRoute();
    const serverurl = React.useContext(ServerurlContext).serverurl;
    const {isDark, toggleDarkMode} = React.useContext(ThemeContext);
    const [searchQuery, setSearchQuery] = React.useState('');

    const {
        userForms, setUserForms
    } = React.useContext(FormsDataContext);

    const {
        setUserAuthenticated, userToken, setUserToken, userEmail, setUserEmail, userId, setUserId,
    } = React.useContext(AuthContext);

    const handleOpenPress = (formId, formName, formAttributes, formData) => {
        console.log("handleOpenPress: ", formId);
        console.log("handleOpenPress: ", formName);
        console.log("handleOpenPress: ", formAttributes);
        console.log("handleOpenPress: ", formData);

        navigation.navigate("FormScreen", {
            formId: formId,
            formName: formName,
            formAttributes: formAttributes,
            formData: formData
        })
    }

    React.useEffect(() => {
        console.log("server Url: ", serverurl);
        console.log("userToken: ", userToken)
        console.log("Forms are: ", forms)
        console.log("navigation: ", navigation)
        // // get data from server using axios get request
        // axios
        //     .post(serverurl + "db/get_forms", {
        //         token: userToken,
        //     })
        //     .then((response) => {
        //         console.log("response.data: ", response.data);
        //         setForms(response.data);
        //     })
        //     .catch((error) => {
        //         console.log("error: ", error);
        //         // Show an alert that there is some error for 2 seconds.
        //         Alert.alert("Server Error!", "Please try Later", [{
        //             text: "Sorry!! Error Connecting to the Server, Please Try again later.",
        //             onPress: () => console.log("Cancel Pressed"),
        //             style: "cancel",
        //         }, {text: "OK", onPress: () => console.log("OK Pressed")},]);
        //     });
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
            {userForms ? userForms.filter((form) => {
                return form.name.toLowerCase().includes(searchQuery.toLowerCase())
            }).map((form, index) => {
                return (<View
                    key={index}
                    className={`m-4 p-4 rounded-lg ${isDark ? `bg-background_dark_color-500` : `bg-secondary_color-200`}`}
                >
                    <Text
                        className={`text-lg font-bold ${isDark ? `text-white` : `text-black`}`}
                    >
                        {form.name}
                    </Text>
                    <Text
                        className={`text-sm ${isDark ? `text-white` : `text-black`}`}
                    >
                        {form.description ? form.description : "No Description Provided."}
                    </Text>
                    <Button
                        mode="contained"
                        onPress={() => {
                            handleOpenPress(form.id, form.name, form.attributes, form.data)
                        }}
                        className={`mt-4 ${isDark ? `bg-primary_color-500` : `bg-primary_color-300`}`}
                    >
                        Open
                    </Button>
                </View>)
            }) : <Text
                className={`text-lg text-center self-center font-bold text-center ${isDark ? `text-white` : `text-black`}`}
            >
                No Forms Found.
            </Text>


            }
        </ScrollView>
    </View>);
};

export default Forms;
