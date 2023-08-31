import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, RefreshControl, VirtualizedList, TouchableOpacity, ActivityIndicator, Linking, ScrollView } from "react-native";
import axios from "axios";
import { listItems } from "../style/styling";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';

const GetNewComers = ({ isFocused }) => {
    const httpAddress = "172.20.10.3"
    const [newComerss, setNewComers] = useState([]);
    const [error, setError] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const { listItemTextContainer, listItemText, editIcon, activityIndicator, listItemContainer, listItemDetails, totalPerson } = listItems;
    const [fetching, setFetching] = useState(false);

    const total = newComerss.length;

    const navigation = useNavigation();
    useEffect(() => {
        const getNewComers = async () => {
            setFetching(true);
            try {
                const newComer = await axios.get(`http://${httpAddress}:3001/newComers`);
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
                const newComer = await axios.get(`http://${httpAddress}:3001/newComers`);
                setNewComers(newComer.data);
                setFetching(false);
            } catch (error) {
                setError("Something went wrong, please try again");
            }
        };
        getNewComers();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        if(isFocused) {
            const getNewComers = async () => {
                setFetching(true);
                try {
                    const newComer = await axios.get(`http://${httpAddress}:3001/newComers`);
                    setNewComers(newComer.data);
                    setFetching(false);
                } catch (error) {
                    setError("Something went wrong, please try again");
                }
            };
            getNewComers();
        }
    }, [isFocused]);

    const editPerson = (id) => {
        navigation.removeListener
        navigation.navigate("UpdateComer", { id: id });
    };
    const dataWithTotal = [{ type: 'total', total }, ...newComerss];
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                {fetching ? <ActivityIndicator size="large" style={activityIndicator} color="#0000ff" />
                :
                <View>
                    <VirtualizedList
                        data={dataWithTotal}
                        renderItem={({ item }) => {
                            if (item.type === 'total') {
                                return (
                                    <View style={listItemContainer}>
                                        <View style={listItemTextContainer}>
                                            <Text style={totalPerson}>Total number of new comers: {item.total}</Text>
                                        </View>
                                    </View>
                                );
                            }
                            return (
                                <View style={listItemContainer}>
                                    <View style={listItemTextContainer}>
                                        <Text style={listItemText}>{item.name} {item.lastName}</Text>
                                        <Text style={listItemDetails}>Age: {item.age}</Text>
                                        <Text style={listItemDetails} onPress={() => Linking.openURL(`mailto:${item.email}`)}>Email: {item.email}</Text>
                                        <Text style={listItemDetails} onPress={() => Linking.openURL(`tel:${item.phone}`)}>Phone: {item.phone}</Text>
                                        <Text style={listItemDetails} onPress={() => Linking.openURL(`http://maps.google.com/maps?q=${item.address}`)}>Address: {item.address}</Text>
                                    </View>
                                    <TouchableOpacity style={editIcon} onPress={() => editPerson(item._id)}>
                                        <Feather name="edit" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                        keyExtractor={(item, index) => (item.type === 'total' ? 'total' : item._id)}
                        getItemCount={(data) => data.length}
                        getItem={(data, index) => data[index]}
                        contentContainerStyle={{ flexGrow: 1 }}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    />
                </View>
                }
            </SafeAreaView>
        </View>
    );
}

export default GetNewComers;