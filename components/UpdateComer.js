import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, TextInput, Button, TouchableOpacity, SafeAreaView, Alert} from "react-native";
import axios from "axios";
import { styleForm } from "../style/styling";
import { useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const UpdateComer = ({ navigation }) => {
    navigation.removeListener;
    const route = useRoute();
    const { id } = route.params;
    const [name, setName] = useState("");
    const [age, setAge] = useState(null);
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [fetchingError, setFetchingError] = useState(false);

    const { container, input, saveButton, buttonText, errorMessageStyle, header, fieldContainer, fieldLabel, cancelButton, deleteButton, actions } = styleForm;

    useEffect(() => {
        const getNewComer = async () => {
            try {
                const response = await axios.get(`http://192.168.1.129:3001/newComers/${id}`);
                if (response.status === 200) {
                    const user = response.data;
                    setName(user.name);
                    setLastName(user.lastName);
                    setAge(user.age);
                    setEmail(user.email);
                    setPhone(user.phone);
                    setAddress(user.address);
                } else {
                    setFetchingError(true);
                }
            } catch (error) {
                setFetchingError(true);
            }
        };
        getNewComer();
    }, []);  

    const handleUpdateComer = async (name, lastName, age, email, phone, address) => {
        if (name === "" || lastName === "" || !age  || email === "" || phone === "" || address === "") {
            setErrorMessage("Please fill in all fields");
            return;
        }
        let emailRegex = /^[\w+!#$£€@%&'*+=^_´`{|}~.-]+@\w+\.\w+(\.\w+)?$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email");
            return;
        }

        const updatedComers = {
            name: name,
            lastName: lastName,
            age: age,
            email: email,
            phone: phone,
            address: address,
        };
        // console.log(updatedComers);
        setName("");
        setLastName("");
        setAge("");
        setEmail("");
        setPhone("");
        setAddress("");

        try {
            const response = await axios.put(`http://192.168.1.129:3001/newComers/${id}`, updatedComers);
            if (response.status === 200 && response.status < 300) {
                navigation.navigate("Updated");
            } else {
                setFetchingError(true);
            }
        } catch (error) {
            setFetchingError(true);
        }
    };

    const deleteComer = () => {
        Alert.alert(
            "Delete",
            `Are you sure you want to delete ${name} ${lastName}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            const response = await axios.delete(`http://192.168.1.129:3001/newComers/${id}`);
                            if (response.status === 200 && response.status < 300) {
                                navigation.navigate("Home Screen");
                            }
                        } catch (error) {
                            setFetchingError(true);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        if (fetchingError) {
          navigation.navigate("Error");
        }
      }, [fetchingError]);
    return (
        <TouchableWithoutFeedback>
            <KeyboardAwareScrollView
                style={{ backgroundColor: '#fff' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={container}
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
            >
                <SafeAreaView style={{ flex: 1 }}>
                <View style={container}>
                    <Text style={header}>Edit</Text>
                    <View style={actions}>
                        <View style={cancelButton}>
                            <Button title="Cancel" onPress={() => navigation.navigate('Home Screen')} />
                        </View>
                        <View style={deleteButton}>  
                            <Button title="Delete" onPress={deleteComer} />
                        </View>
                    </View>
                    <View style={fieldContainer}>
                        <Text style={fieldLabel}>Name</Text>
                        <TextInput
                            style={input}
                            placeholder="First Name"
                            autoCapitalize="words"
                            onChangeText={(text) => setName(text)}
                            value={name} 
                        />
                    </View>
                    <View style={fieldContainer}>
                        <Text style={fieldLabel}>Last Name</Text>
                        <TextInput
                            style={input}
                            placeholder="Last Name"
                            autoCapitalize="words"
                            onChangeText={(text) => setLastName(text)}
                            value={lastName} 
                        />
                    </View>
                    <View style={fieldContainer}>
                        <Text style={fieldLabel}>Age</Text>
                        <TextInput
                            style={input}
                            placeholder="Age"
                            keyboardType="numeric"
                            onChangeText={(text) => setAge(text)}
                            value={age !== null ? age.toString() : ""}
                        />
                    </View>
                    <View style={fieldContainer}>
                        <Text style={fieldLabel}>Email</Text>
                        <TextInput
                            style={input}
                            placeholder="Email"
                            testID="LoginEmailAddress"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                    </View>
                    <View style={fieldContainer}>
                        <Text style={fieldLabel}>Phone</Text>
                        <TextInput
                            style={input}
                            placeholder="Phone"
                            textContentType="telephoneNumber"
                            keyboardType="phone-pad"
                            onChangeText={(text) => setPhone(text)}
                            value={phone}
                        />
                    </View>
                    <View style={fieldContainer}>
                        <Text style={fieldLabel}>Address</Text>
                        <TextInput
                            style={input}
                            placeholder="Address"
                            onChangeText={(text) => setAddress(text)}
                            value={address}
                        />
                    </View>
                    <Text style={errorMessageStyle}>{errorMessage}</Text>
                    <View style={saveButton} >
                        <TouchableOpacity  onPress={() => handleUpdateComer(name, lastName, age, email, phone, address)}>
                            <Text style={buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    );
}

export default UpdateComer;