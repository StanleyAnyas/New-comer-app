import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableWithoutFeedback, VirtualizedList, Keyboard, ActivityIndicator, TouchableOpacity } from "react-native";
import { searchComer } from "../style/styling";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from "axios";

const Search = ({ navigation }) => {
    const httpAddress = "172.20.10.3"
    const [search, setSearch] = useState("");
    const { container, activityIndicator,  listItemContainer, listItemTextContainer, listItemText } = searchComer;
    const [fullData, setFullData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState("");
    const [fetching, setFetching] = useState(false);

    const onBackPress = () =>{
        navigation.goBack();
    }
    useEffect(() => {
        const getNewComers = async () => {
            try {
                setFetching(true);
                const newComer = await axios.get(`http://${httpAddress}:3001/newComers`);
                setFullData(newComer.data);
                setFetching(false);
            } catch (error) {
                setError("Something went wrong, please try again");
                setFetching(false);
            }
        };
        getNewComers();
    }, []);

    useEffect(() => {
        if (search === "") {
            setFilteredData([]);
        } else {
            const newData = fullData.filter((item) => {
                const itemData = (item.name + " " + item.lastName).toUpperCase() + (item.name + " " + item.lastName).toUpperCase();
                const textData = search.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData([...newData]);
        }
    }, [search, fullData]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* <KeyboardAwareScrollView
                style={{ backgroundColor: '#fff' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={container}
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
            > */}
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={container}>
                    <SearchBar
                        placeholder="Search Here..."
                        onChangeText={(value) => setSearch(value)}
                        value={search}
                        lightTheme={true}
                        round={true}
                        containerStyle={{ backgroundColor: "#f2f2f2" }}
                        inputContainerStyle={{ backgroundColor: "#f6f6f6" }}
                        inputStyle={{ color: "#000" }}
                        searchIcon={
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                color="black"
                                style={{ marginRight: 10 }}
                                onPress={onBackPress}
                            />
                        }
                        clearIcon={
                            <Ionicons
                                name="close"
                                size={24}
                                color="black"
                                style={{ marginRight: 10 }}
                                onPress={() => setSearch("")}
                            />
                        }
                    />
                    <View>
                    {fetching ? <ActivityIndicator size="large" style={activityIndicator} color="#0000ff" />
                    :
                    <VirtualizedList
                        data={filteredData}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={listItemContainer} onPress={() => navigation.navigate("UpdateComer", { id: item._id })}>
                                <View style={listItemTextContainer}>
                                    <Text style={listItemText}>{item.name} {item.lastName}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item._id}
                        getItemCount={(data) => data.length}
                        getItem={(data, index) => data[index]}
                        contentContainerStyle={{ flexGrow: 1 }}
                    />
                    }
                    </View>
                    </View>
                </SafeAreaView> 
            {/* </KeyboardAwareScrollView> */}
        </TouchableWithoutFeedback>
    )
}

export default Search;