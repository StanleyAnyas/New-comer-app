import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, RefreshControl, VirtualizedList, TouchableOpacity } from "react-native";
import axios from "axios";
import { listItems } from "../style/styling";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GetNewComers = () => {
    const [newComerss, setNewComers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { listItem, listItemText, editIcon } = listItems;

    const navigation = useNavigation();
    
    useEffect(() => {
        const getNewComers = async () => {
            try {
                const newComer = await axios.get("http://192.168.1.129:3001/newComers");
                setNewComers(newComer.data);
            } catch (error) {
                console.log("Error2:", error);
            }
        };
        getNewComers();
    }, []);
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        const getNewComers = async () => {
            try {
                const newComer = await axios.get("http://192.168.1.129:3001/newComers");
                setNewComers(newComer.data);
            } catch (error) {
                console.log("Error2:", error);
            }
        };
        getNewComers();
        setRefreshing(false);
    }, []);

    const editPerson = (id) => {
        navigation.navigate("UpdateComer", { id: id });
    };

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <VirtualizedList
                    data={newComerss}
                    renderItem={({ item }) => (
                        <View>
                            <View style={listItem}>
                                <Text style={listItemText}>{item.name} {item.lastName}</Text>
                                <Text>Age: {item.age}</Text>
                                <Text>Email: {item.email}</Text>
                                <Text>Phone: {item.phone}</Text>
                                <Text>Address: {item.address}</Text>
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
                />
            </SafeAreaView>
        </View>
    );
}

export default GetNewComers;