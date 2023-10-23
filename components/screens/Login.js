import React, {useState} from "react";
import {View, Text, Alert, BackHandler, ImageBackground, TextInput, KeyboardAvoidingView} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ServerurlContext} from "../../context/ServerurlContext";
import axios from "axios";
import {ThemeContext} from "../../context/ThemeContext";
import {StatusBar} from "expo-status-bar";
import {Button} from "react-native-ui-lib";
import {AuthContext} from "../../context/AuthContext";
import DialogDisplay from "../ui/Dialog";
import {FormsDataContext} from "../../context/UserFormsData";

const Login = (props) => {
    // contexts
    const {isDark, toggleDarkMode} = React.useContext(ThemeContext);
    const serverUrl = React.useContext(ServerurlContext).serverurl;
    const {
        setUserAuthenticated, userToken, setUserToken, userEmail, setUserEmail, userId, setUserId,
    } = React.useContext(AuthContext);
    const navigation = useNavigation();
    const route = useRoute();
    const [wannaRetry, setWannaRetry] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailComment, setEmailComment] = useState("");
    const [passwordComment, setPasswordComment] = useState("");
    const handleUserAuthenticated = route.params.handleUserAuthenticated;

    const {
        userForms, setUserForms
    } = React.useContext(FormsDataContext);
    const handleLogin = () => {
        console.log("Login Pressed");
        console.log("email: ", email);
        console.log("password: ", password);

        // if email is not valid, update comment
        if (email.length === 0) {
            setEmailComment("Email is Required");
            return;
        }
        if (email.length < 6) {
            setEmailComment("Email is too short");
            return;
        }
        if (email.length > 254) {
            setEmailComment("Email is too long");
            return;
        }
        if (!email.includes("@")) {
            setEmailComment("Email is invalid");
            return;
        }
        if (!email.includes(".")) {
            setEmailComment("Email is invalid");
            return;
        }
        if (email.includes(" ")) {
            setEmailComment("Email is invalid");
            return;
        }
        setEmailComment("");

        // now do the same with password
        if (password.length === 0) {
            setPasswordComment("Password is Required");
            return;
        }
        if (password.length < 8) {
            setPasswordComment("Password is too short (min 8)");
            return;
        }
        if (password.length > 16) {
            setPasswordComment("Password length is more than 16");
            return;
        }
        setPasswordComment("");

        console.log("email and password are valid. ")
        // send to server using axios post request
        axios
            .post(serverUrl + "auth/login", {
                email: email, password: password,
            })
            .then((response) => {
                console.log("response.data: ", response.data);
                if (response.data.status_code === 401) {
                    console.log("401 error, couldnt login")
                    Alert.alert("Are you Sure?", "Email or Password doesnt seem to be valid. ", [{
                        text: "Retry", onPress: () => {
                            console.log("Retry Pressed")
                            setWannaRetry((wannaRetry) => {
                                return !wannaRetry;
                            });
                        },
                    }]);
                    return;
                }
                if (response['status'] === 400) {
                    Alert.alert("Are you Sure?", "Email or Password doesnt seem to be valid. ", [{
                        text: "Retry", onPress: () => {
                            console.log("Retry Pressed")
                            setWannaRetry((wannaRetry) => {
                                return !wannaRetry;
                            });
                        },
                    }]);
                    return;
                }
                if (response['status'] === 200) {
                    // login successful
                    console.log("Login Successful");
                    // set the user and userToken in the context
                    setUserId(response.data['Id']);
                    setUserEmail(email);
                    setUserToken(response.data['Token']);
                    setUserAuthenticated(true);
                    console.log(route.params)
                    handleUserAuthenticated(true);
                    console.log("trying to get user forms data. ")

                    const user_token = response.data['Token'];
                    // get data from server using axios get request
                    axios
                        .post(serverUrl + "db/get_forms", {
                            token: user_token,
                        })
                        .then((response) => {
                            console.log("response.data: ", response.data);
                            setUserForms(response.data);
                        })
                        .catch((error) => {
                            console.log("error: ", error);
                        });


                }
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
    }

    const handleForgotPassword = () => {
        console.log("Forgot Password Pressed");
        if (email.length === 0) {
            setEmailComment("Email is Required");
            return;
        }
        axios
            .post(serverUrl + "auth/reset_password", {
                email: email,
            })
            .then((response) => {
                console.log("response.data: ", response.data);
                if (response.data['status_code'] === 400) {
                    Alert.alert("Are you Sure?", "Email or Password doesnt seem to be valid. ", [{
                        text: "Retry", onPress: () => {
                            console.log("Retry Pressed")
                            setWannaRetry((wannaRetry) => {
                                return !wannaRetry;
                            });
                        },
                    }]);
                }
            })
            .catch((error) => {
                console.log("error: ", error.message);
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
    }


    React.useEffect(() => {
        console.log("Welcome to Logging in. ")
        console.log(route.params)
        console.log("serverurl: ", serverUrl);
        console.log("user token", userToken);
        // get data from server using axios get request
        axios
            .get(serverUrl + "")
            .then((response) => {
                console.log("response.data: ", response.data);
                console.log("Connection Established to the Server.");
            })
            .catch((error) => {
                console.log("error: ", error.message);


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


    return (<View className={`flex-1 ${isDark ? `bg-background_dark_color-500` : `bg-background_color-400`}`}
    >
        <ImageBackground
            source={require("../../assets/beams.fc7585c96ed1be49b576.jpg")}
            style={{
                flex: 1, resizeMode: "cover", overflow: "hidden", justifyContent: "flex-start",
            }}
            imageStyle={{
                opacity: 1,
            }}
        >
            <StatusBar style={isDark ? `light` : `dark`}/>
            <View className="h-1/4 flex justify-end items-center">
                <ImageBackground
                    source={require("../../assets/ic_launcher.png")}
                    className="h-36 w-36"
                />
            </View>
            <Text
                className={`text-4xl text-center m-4 p-4 ${isDark ? `text-text_dark_color-500` : `text-text_color-500`}`}
            >
                Login
            </Text>
            <KeyboardAvoidingView className="flex justify-center items-center">

                <KeyboardAvoidingView
                    className={`flex justify-center items-center w-screen p-4 pt-10 m-2 rounded-2xl w-4/5 border border-1 ${isDark ? `bg-background_dark_color-500` : `bg-primary_color-100`}`}
                >
                    <TextInput
                        className={`text-lg outline text-center m-2 p-2 mb-1 rounded-full w-full border ${isDark ? `text-text_dark_color-500 bg-background_dark_color-500` : `text-black bg-background_color-600`}`}

                        onChangeText={(text) => {
                            setEmail(text);
                        }}
                        value={email}
                        autoFocus={true}
                        keyboardAppearance={isDark ? `dark` : `light`}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                    />

                    <Text
                        className={`text-sm text-left m-0 p-0 ${isDark ? `text-text_dark_color-500` : `text-red-800`}`}
                    >
                        {emailComment}
                    </Text>

                    <TextInput
                        className={`text-lg outline text-center m-2 p-2 mb-0 rounded-full w-full border ${isDark ? `text-text_dark_color-500 bg-background_dark_color-500` : `text-black bg-background_color-600`}`}
                        onChangeText={(text) => {
                            setPassword(text);
                        }}
                        value={password}
                        secureTextEntry={true}
                        keyboardAppearance={isDark ? `dark` : `light`}
                        placeholder="Enter your Password"
                        keyboardType="default"
                    />
                    <Text
                        className={`text-sm text-left m-0 p-0 mt-1 ${isDark ? `text-text_dark_color-500` : `text-red-800`}`}
                    >
                        {passwordComment}
                    </Text>
                    <Button label={'Login'} className="p-3 m-1 w-3/5 mb-4 mt-10 bg-primary_color-500" onPress={() => {
                        console.log("Login Pressed");
                        handleLogin();
                    }}
                        // disabled={email.length === 0 || password.length === 0}
                    />

                    <Text
                        className={`text-sm text-center my-0 hover:underline ${isDark ? `text-text_dark_color-300` : `text-text_color-300`}`}
                        onPress={() => {
                            console.log("Sign Up Pressed");
                            navigation.navigate("Signup");
                        }}
                    >
                        Dont have an Account? Sign Up!
                    </Text>
                    <Text
                        className={`text-sm text-center my-0 ${isDark ? `text-text_dark_color-300` : `text-text_color-300`}`}
                        onPress={() => {

                            console.log("Forgot Password Pressed");
                            // {
                            //     <DialogDisplay/>
                            // }
                            Alert.alert("Reset Password", "We get it. Stuff Happens. We can send you an email on your registered Email with a link to reset your password. ", [{
                                    text: "Send Mail", onPress: () => {
                                        console.log("Calling to send reset mail")
                                        handleForgotPassword();
                                    },
                                }, {
                                    text: "Retry", onPress: () => {
                                        console.log("trying pass again")
                                    }, style: "cancel",
                                },]
                            )
                        }}
                    >
                        Forgot Password?
                    </Text>

                </KeyboardAvoidingView>
            </KeyboardAvoidingView>

        </ImageBackground>
    </View>);
};

export default Login;
