import React, {useState} from "react";
import {View, Text, Button, Alert} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ServerurlContext} from "../../context/ServerurlContext";
import {ThemeContext} from "../../context/ThemeContext";
import axios from "axios";
import {StatusBar} from "expo-status-bar";

const Home = (props) => {
    const route = useRoute();
    const data = route.params !== undefined ? route.params.some_data : "no data";
    const [serverMessage, setServerMessage] = useState("");
    const navigation = useNavigation();
    const serverurl = React.useContext(ServerurlContext).serverurl;
    const {isDark, toggleDarkMode} = React.useContext(ThemeContext);


    React.useEffect(() => {
        console.log("serverurl: ", serverurl);
        // get data from server using axios get request
        axios
            .get(serverurl + "")
            .then((response) => {
                console.log("response.data: ", response.data);
                setServerMessage(response.data.message);
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
        style={{
            flex: 1,
        }}
        className={`border ${isDark ? `bg-background_dark_color-500` : `bg-background_color-500`}`}
    >
        <StatusBar
            animated={true}
            style={isDark ? "dark" : "light"}
        />

        <Text
            style={{
                fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 20,
            }}
        >
            Screen 1
        </Text>
        <Button
            title="Go to Screen 2"
            onPress={() => navigation.navigate("Screen2", {
                some_data: "some data from screen 1",
            })}
        />
        <Text>{data}</Text>
        {serverMessage === "" ? (<Text>loading...</Text>) : (<Text>{serverMessage}</Text>)}
    </View>);
};

export default Home;
