import React, { useState } from "react";
import { TextInput, View, Button, Text, KeyboardAvoidingView, Platform  } from "react-native";
import { styleForm } from "../style/styling";

const AddComer = () => {
    const { container, input, button, buttonText, errorMessageStyle } = styleForm;
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    let errorTimeout;
    const addNewUser = (name, lastName, age, email, phone, address) => {
        clearTimeout(errorTimeout);

        // Validation
        if (!name || !age || !email || !phone || !address || !lastName) {
            setErrorMessage("Please fill in all fields");
            errorTimeout = setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return;
        }
      
        const newUser = {
            name: name,
            lastName: lastName,
            age: age,
            email: email,
            phone: phone,
            address: address,
        };
        console.log(newUser);
        // clear input fields
        setName("");
        setLastName("");
        setAge("");
        setEmail("");
        setPhone("");
        setAddress("");
        // Post new user
        fetch("http://localhost:3000/newComers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err));
        };

    return (
        <KeyboardAvoidingView
            style={container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={container}>
                <TextInput
                    style={input}
                    placeholder="First Name"
                    autoCapitalize="words"
                    onChangeText={(text) => setName(text)}
                    value={name}    
                />
                <TextInput
                    style={input}
                    placeholder="Last Name"
                    autoCapitalize="words"
                    onChangeText={(text) => setLastName(text)}
                    value={lastName} 
                />
                <TextInput
                    style={input}
                    placeholder="Age"
                    keyboardType="numeric"
                    onChangeText={(text) => setAge(text)}
                    value={age}
                />
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
                <TextInput
                    style={input}
                    placeholder="Phone"
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                />
                <TextInput
                    style={input}
                    placeholder="Address"
                    onChangeText={(text) => setAddress(text)}
                    value={address}
                />
                <Text style={errorMessageStyle}>{errorMessage}</Text>
                <Button
                    style={button}
                    title="Save"
                    titleStyle={buttonText}
                    onPress={() => addNewUser(name, lastName, age, email, phone, address)}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

export default AddComer;