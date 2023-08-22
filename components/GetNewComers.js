import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

const GetNewComers = () => {
    const [newComers, setNewComers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/newComers")
            .then((response) => response.json())
            .then((json) => setNewComers(json))
            .catch((err) => console.log(err));
    }, []);

    return (
        <View>
            {newComers.map((newComer) => (
                <Text key={newComer.id}>{newComer.name}</Text>
            ))}
        </View>
    );
}

export default GetNewComers;