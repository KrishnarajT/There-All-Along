import React, {useState} from "react";
import {View, Text, Alert, ScrollView, TextInput} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ServerurlContext} from "../../context/ServerurlContext";
import {ThemeContext} from "../../context/ThemeContext";
import axios from "axios";
import {StatusBar} from "expo-status-bar";
import {DataTable, Provider} from 'react-native-paper';
import {BackHandler} from 'react-native';
import {Button, Picker} from "react-native-ui-lib";
import {MaterialIcons} from "@expo/vector-icons";

const Form = (props) => {
    const route = useRoute();
    const navigation = useNavigation();
    const serverurl = React.useContext(ServerurlContext).serverurl;
    const {isDark, toggleDarkMode} = React.useContext(ThemeContext);
    const options = [
        {label: 'JavaScript', value: 'js'},
        {label: 'Java', value: 'java'},
        {label: 'Python', value: 'python'},
        {label: 'C++', value: 'c++', disabled: true},
        {label: 'Perl', value: 'perl'}
    ];
    const [page, setPage] = React.useState(0)
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);

    const [formName, setFormName] = React.useState(route.params.formName);
    const [formDescription, setFormDescription] = React.useState(route.params.description);
    const [formAttributes, setFormAttributes] = React.useState(route.params.formAttributes);

    const [items] = React.useState([{
        key: 1, name: 'Cupcake', calories: 356, fat: 16,
    }, {
        key: 2, name: 'Eclair', calories: 262, fat: 16,
    }, {
        key: 3, name: 'Frozen yogurt', calories: 159, fat: 6,
    }, {
        key: 4, name: 'Gingerbread', calories: 305, fat: 3.7,
    },]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    // use the backhandler to go back to the previous screen.
    React.useEffect(() => {
        const handleBackButton = () => {
            // Add your code to execute when the back button is pressed
            console.log('Back button pressed');
            navigation.navigate("Forms",)
            return true; // Return true to prevent default behavior (exiting the app)
        };

        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        console.log("serverurl: ", serverurl);
        console.log(route.params)
        // change the title
        navigation.setOptions({title: route.params.formName})

        // get data from server using axios get request
        // axios
        //     .get(serverurl + "")
        //     .then((response) => {
        //         console.log("response.data: ", response.data);
        //         setServerMessage(response.data.message);
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
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, [serverurl, navigation]);
    return (<ScrollView
        style={{
            flex: 1,
        }}
        className={`border ${isDark ? `bg-background_dark_color-500` : `bg-background_color-500`}`}
    >
        <StatusBar
            animated={true}
            style={isDark ? "dark" : "light"}
        />

        {/* Show all the Attributes, and provide options to add or remove attributes. show attributes as a scrollable element list.    */}
        <View className="flex w-screen my-2 justify-center items-center">
            <Text
                className={`text-xl text-center m-2 ${isDark ? `bg-background_dark_color-500` : `bg-background_color-500 text-secondary_color-500`}`}
            >
                Name
            </Text>
            <TextInput
                className={`text-lg outline text-center m-2 p-2 w-4/5 mb-0 rounded-xl border ${isDark ? `text-text_dark_color-500 bg-background_dark_color-500` : `text-black bg-secondary_color-200`}`}
                onChangeText={(text) => {
                    setFormName(text);
                }}
                value={formName}
                keyboardAppearance={isDark ? `dark` : `light`}
                placeholder="Form Name"
                keyboardType="default"
            />
        </View>

        <View className="flex w-screen my-2 justify-center items-center">
            <Text
                className={`text-xl text-center m-2 ${isDark ? `bg-background_dark_color-500` : `bg-background_color-500 text-secondary_color-500`}`}
            >
                Description
            </Text>
            <TextInput
                className={`text-lg outline text-center m-2 p-2 mb-0 rounded-xl w-4/5 border ${isDark ? `text-text_dark_color-500 bg-background_dark_color-500` : `text-black bg-secondary_color-200`}`}
                onChangeText={(text) => {
                    setFormDescription(text);
                }}
                value={formDescription}
                keyboardAppearance={isDark ? `dark` : `light`}
                placeholder="Form Description"
                keyboardType="default"
            />
        </View>
        <Text
            className={`text-xl text-center m-2 ${isDark ? `bg-background_dark_color-500` : `bg-background_color-500 text-secondary_color-500`}`}
        >
            Attributes
        </Text>

        <ScrollView
            className={`flex-1 h-1/2 ${isDark ? `bg-background_dark_color-500` : `bg-background_color-500`}`}
        >
            {formAttributes ? (formAttributes.map((attribute, index) => {
                return (
                    <View className="flex w-screen my-2 items-start" key={index}>
                        <Text
                            className={`text-lg text-center w-1/4 ${isDark ? `bg-background_dark_color-500` : `bg-background_color-500`}`}
                        >
                            Name
                        </Text>
                        <TextInput
                            className={`text-lg outline text-center m-2 p-2 mb-0 mx-6 rounded-xl w-5/6 border ${isDark ? `text-text_dark_color-500 bg-background_dark_color-500` : `text-black bg-secondary_color-200`}`}
                            // onChangeText={(text) => {
                            //     setFormDescription(text);
                            // }}
                            value={attribute.name}
                            keyboardAppearance={isDark ? `dark` : `light`}
                            placeholder="Form Description"
                            keyboardType="default"
                        />
                        <View className="flex flex-row m-2">
                            <Picker
                                value={"hi"}
                                placeholder={'Select Type'}
                                onChange={() => console.log('changed')}
                                useWheelPicker={true}
                                trailingAccessory={
                                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black"/>
                                }
                                containerStyle={{margin: 20}}
                                renderPicker={() => {
                                    return (
                                        <View className="m-1 p-1 flex flex-row">
                                            <Text className="text-lg px-4">Type</Text>
                                            <MaterialIcons name="keyboard-arrow-down" size={24} color="black"/>
                                        </View>
                                    );
                                }}
                                topBarProps={{doneLabel: 'Select', cancelLabel: 'Cancel'}

                                }

                            >
                                {options.map((type, i) => {
                                    return (
                                        <Picker.Item key={i} value={type.value} label={type.label}
                                                     disabled={i === 0}
                                        />
                                    );
                                })}
                            </Picker>

                            <Text
                                className={`text-lg text-center mt-2 ${isDark ? `bg-background_dark_color-500` : `bg-background_color-500`}`}
                            >
                                {attribute.type}
                            </Text>
                        </View>

                    </View>

                );
            })) : (<Text
                className={`text-center ${isDark ? `bg-background_dark_color-500` : `bg-background_color-500`}`}
            >
                No Attributes
            </Text>)}
        </ScrollView>
        <Text
            className={`text-xl text-center m-2 ${isDark ? `bg-background_dark_color-500` : `bg-background_color-500 text-secondary_color-500`}`}
        >
            Data
        </Text>
        <Provider>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title sortDirection='ascending'>Dessert</DataTable.Title>
                    <DataTable.Title numeric>Calories</DataTable.Title>
                    <DataTable.Title numeric>Fat</DataTable.Title>
                </DataTable.Header>

                {items.slice(from, to).map((item) => (<DataTable.Row key={item.key}>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
                </DataTable.Row>))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(items.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${items.length}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    showFastPaginationControls
                />
            </DataTable>
        </Provider>

        <View className="flex justify-center items-center m-4 mb-8">

            <Button label={'Save'}
                    className={`text-center w-4/5 ${isDark ? `bg-background_dark_color-500` : `bg-primary_color-500`}`}
                    onPress={() => {
                        console.log("save Pressed");
                    }}
                // disabled={email.length === 0 || password.length === 0}
            />
        </View>
    </ScrollView>);
};

export default Form;
