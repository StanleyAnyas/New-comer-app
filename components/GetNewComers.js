import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getAllNewComers } from "../my-backend/database";
// import axios from "axios";

const GetNewComers = () => {
    const [newComers, setNewComers] = useState([]);
    
    useEffect(() => {
        const getNewComers = async () => {
            try {
                const newComer = await getAllNewComers();
                setNewComers(newComer);
            } catch (error) {
                console.log(error);
            }
        };
        getNewComers();
    }, []);

    return (
        <View>
            <FlatList
                data={newComers}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Text>{item.lastName}</Text>
                        <Text>{item.age}</Text>
                        <Text>{item.email}</Text>
                        <Text>{item.phone}</Text>
                        <Text>{item.address}</Text>
                    </View>
                )}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
}

export default GetNewComers;