import React, {useState} from "react";
import {View, Text, Button, Alert} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ServerurlContext} from "../../context/ServerurlContext";
import axios from "axios";

const Login = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const data = route.params !== undefined ? route.params.some_data : "no data";
    const [serverMessage, setServerMessage] = useState("");
    const serverurl = React.useContext(ServerurlContext).serverurl;
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
    return (<View>
            <Text
                style={{
                    fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 20,
                }}
            >
                Login
            </Text>
            <Button
                title="Go to signup if you dont have an account"
                onPress={() => navigation.navigate("Signup", {
                    some_data: "some data from screen 1",
                })}
            />
            <Button
                title="Login"
                onPress={() => {
                    console.log(route.params)
                }}
            />
            <Text>{data}</Text>
            {serverMessage === "" ? (<Text>loading...</Text>) : (<Text>{serverMessage}</Text>)}
        </View>);
};

export default Login;
