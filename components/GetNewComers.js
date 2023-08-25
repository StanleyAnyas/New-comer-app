import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, RefreshControl, VirtualizedList, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import { listItems } from "../style/styling";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GetNewComers = () => {
    const [newComerss, setNewComers] = useState([]);
    const [error, setError] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const { listItemTextContainer, listItemText, editIcon, activityIndicator, listItemContainer, listItemDetails } = listItems;
    const [fetching, setFetching] = useState(false);

    const navigation = useNavigation();
    useEffect(() => {
        const getNewComers = async () => {
            setFetching(true);
            try {
                const newComer = await axios.get("http://192.168.1.129:3001/newComers");
                setNewComers(newComer.data);
                setFetching(false);
            } catch (error) {
                setError("Something went wrong, please try again");
            }
        };
        getNewComers();
    }, []);
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setFetching(true);
        const getNewComers = async () => {
            try {
                const newComer = await axios.get("http://192.168.1.129:3001/newComers");
                setNewComers(newComer.data);
                setFetching(false);
            } catch (error) {
                setError("Something went wrong, please try again");
            }
        };
        getNewComers();
        setRefreshing(false);
    }, []);

    const editPerson = (id) => {
        navigation.removeListener
        navigation.navigate("UpdateComer", { id: id });
    };
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                {fetching ? <ActivityIndicator size="large" style={activityIndicator} color="#0000ff" />
                :
                <VirtualizedList
                    data={newComerss}
                    renderItem={({ item }) => (
                        <View style={listItemContainer}>
                            <View style={listItemTextContainer}>
                                <Text style={listItemText}>{item.name} {item.lastName}</Text>
                                <Text style={listItemDetails}>Age: {item.age}</Text>
                                <Text style={listItemDetails}>Email: {item.email}</Text>
                                <Text style={listItemDetails}>Phone: {item.phone}</Text>
                                <Text style={listItemDetails}>Address: {item.address}</Text>
                            </View>
                            <TouchableOpacity style={editIcon} onPress={() => editPerson(item._id)}>
                                <Feather name="edit" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item._id}
                    getItemCount={(data) => data.length}
                    getItem={(data, index) => data[index]}
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />}
            </SafeAreaView>
        </View>
    );
}

export default GetNewComers;