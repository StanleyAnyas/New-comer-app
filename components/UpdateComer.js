import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, TextInput, Button } from "react-native";
import axios from "axios";
import { styleForm } from "../style/styling";
import { useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const UpdateComer = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params;
    const [name, setName] = useState("");
    const [age, setAge] = useState(null);
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { container, input, button, buttonText, errorMessageStyle, header, fieldContainer, fieldLabel } = styleForm;

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
                    throw new Error("Something went wrong");
                }
            } catch (error) {
                console.log("Error fetching user:", error);
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
                setErrorMessage("Something went wrong, please try again");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <TouchableWithoutFeedback>
            <KeyboardAwareScrollView
                style={{ backgroundColor: '#fff' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={container}
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
            >
                <View style={container}>
                    <Text style={header}>Add new comer</Text>
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
                    <View style={[button, buttonText]} >
                        <Button
                            title="Save"
                            onPress={() => handleUpdateComer(name, lastName, age, email, phone, address)}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    );
}

export default UpdateComer;