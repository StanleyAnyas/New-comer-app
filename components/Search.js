import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, TouchableWithoutFeedback, VirtualizedList, Keyboard, ActivityIndicator, TouchableOpacity } from "react-native";
import { searchComer } from "../style/styling";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import 'react-native-get-random-values';
import axios from "axios";

const Search = ({ navigation }) => {
    const httpAddress = "172.20.10.3"
    const [search, setSearch] = useState("");
    const { container, activityIndicator,  listItemContainer, listItemTextContainer, listItemText, noFound, errorMessage } = searchComer;
    const [fullData, setFullData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState("");
    const [fetching, setFetching] = useState(false);

    const onBackPress = () =>{
        navigation.goBack(null);
    }

    const searchInputRef = useRef(null);
    useEffect(() => {
        searchInputRef.current?.focus();
    }, []);

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

    const noSearchResult = () => {
        if (filteredData.length === 0 && search !== "") {
            return <Text style={noFound}>No results found</Text>;
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setError("");
        });
        return unsubscribe;
    }, [navigation]);

    const checkIfError = () => {
        if (error) {
            return <Text style={errorMessage}>{error}</Text>;
        } else {
            return null;
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                    ref={searchInputRef}
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
                {noSearchResult()}
                {checkIfError()}
                </View>
            </SafeAreaView> 
        </TouchableWithoutFeedback>
    )
}

export default Search;