import React from "react";
import { View, Text, SafeAreaView, Button } from "react-native";

const ShowError = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View>
                <Text>Something went wrong, please try again</Text>
                <Button title="Try again" onPress={() => navigation.navigate("Home Screen")} />
            </View>
        </SafeAreaView>
    );
};

export default ShowError;
