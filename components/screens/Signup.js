import React, {useState} from "react";
import {View, Text, Alert, BackHandler, ImageBackground, TextInput, KeyboardAvoidingView} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ServerurlContext} from "../../context/ServerurlContext";
import axios from "axios";
import {ThemeContext} from "../../context/ThemeContext";
import {StatusBar} from "expo-status-bar";
import {Button} from "react-native-ui-lib";

const Signup = (props) => {
    // contexts
    const {isDark, toggleDarkMode} = React.useContext(ThemeContext);
    const serverUrl = React.useContext(ServerurlContext).serverurl;
    const navigation = useNavigation();
    const route = useRoute();
    const [wannaRetry, setWannaRetry] = useState(false);

    React.useEffect(() => {
        console.log("Welcome to Logging in. ")

        // get data from server using axios get request
        axios
            .get(serverUrl + "")
            .then((response) => {
                console.log("response.data: ", response.data);
                console.log("Connection Established to the Server.");
            })
            .catch((error) => {
                console.log("error: ", error);

                // Show an alert that there is error connecting to the server.
                Alert.alert("Server Error!", "Sorry! Error Connecting to the Server, Please Try again later.", [{
                    text: "Retry", onPress: () => {
                        console.log("Retry Pressed")
                        setWannaRetry((wannaRetry) => {
                            return !wannaRetry;
                        });
                    },
                }, {
                    text: "Exit", onPress: () => {
                        console.log("Exit Pressed")
                        // exit the app completely
                        BackHandler.exitApp();
                    }, style: "cancel",
                },]);
            });
    }, [serverUrl, wannaRetry]);

    return (
        <View className={`flex-1 ${isDark ? `bg-background_dark_color-500` : `bg-background_color-400`}`}
        >
            <StatusBar style={
                isDark ? `light` : `dark`
            }/>
            <View className="h-1/4 flex justify-end items-center">
                <ImageBackground
                    source={require("../../assets/ic_launcher.png")}
                    className="h-36 w-36"
                />
            </View>
            <Text
                className={`text-4xl text-center m-4 p-4 ${isDark ? `text-text_dark_color-500` : `text-text_color-500`}`}
            >
                Sign Up
            </Text>
            <KeyboardAvoidingView className="flex justify-center items-center">

                <KeyboardAvoidingView
                    className={`flex justify-center items-center w-screen p-4 m-2 rounded-2xl w-4/5 border border-2 ${isDark ? `bg-background_dark_color-500` : `bg-primary_color-100`}`}
                >
                    <TextInput
                        className={`text-xl outline text-center m-4 p-4 rounded-full w-full border ${isDark ? `text-text_dark_color-500 bg-background_dark_color-500` : `text-black bg-background_color-600`}`}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        autoFocus={true}
                        keyboardAppearance={isDark ? `dark` : `light`}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                    />
                    <TextInput
                        className={`text-xl outline text-center m-4 p-4 rounded-full w-full border ${isDark ? `text-text_dark_color-500 bg-background_dark_color-500` : `text-black bg-background_color-600`}`}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        autoFocus={true}
                        passwordRules={
                            {
                                minLength: 8,
                                maxLength: 16,
                                minLowercase: 1,
                                minUppercase: 1,
                                minSymbols: 1,
                                minNumbers: 1,
                            }
                        }
                        keyboardAppearance={isDark ? `dark` : `light`}
                        placeholder="Enter your Password"
                        keyboardType="default"
                    />

                    <Button label={'Join Us!'} className="p-4 m-1 w-2/5 mb-4" onPress={
                        () => {
                            console.log("Login Pressed");
                        }
                    } />
                    <Text
                        className={`text-lg text-center p-1 hover:underline ${isDark ? `text-text_dark_color-500` : `text-text_color-500`}`}
                        onPress={
                            () => {
                                console.log("Sign Up Pressed");
                                navigation.navigate("Login");
                            }
                        }
                    >
                        Already have an account? Login!
                    </Text>


                </KeyboardAvoidingView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Signup;
