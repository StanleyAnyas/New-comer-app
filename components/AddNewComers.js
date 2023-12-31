import React, { useState, useEffect } from "react";
import { TextInput, View, Button, Text, TouchableWithoutFeedback, useWindowDimensions, TouchableOpacity } from "react-native";
import { styleForm } from "../style/styling";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from "axios";
import 'react-native-get-random-values';

const AddComer = ({ navigation }) => {
    const httpAddress = "172.20.10.3"
    const { container, input, saveButton, buttonText, errorMessageStyle, header, fieldContainer, fieldLabel, goBackBtn } = styleForm;
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [fetchingError, setFetchingError] = useState(false);

    let errorTimeout;
    const addNewUser = async (name, lastName, age, email, phone, address) => {
        clearTimeout(errorTimeout);
        setErrorMessage("");

        // Validation
        if (!name || !age || !email || !phone || !address || !lastName) {
            setErrorMessage("Please fill in all fields");
            errorTimeout = setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return;
        }
        let emailRegex = /^[\w+!#$£€@%&'*+=^_´`{|}~.-]+@\w+\.\w+(\.\w+)?$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email");
            errorTimeout = setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return;
        }
        let ageRegex = /^\d{1,3}$/;
        if (!ageRegex.test(age)) {
            setErrorMessage("Please enter a valid age");
            errorTimeout = setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return;
        }

       
        name = name.trim();
        lastName = lastName.trim();
        age = age.trim();
        email = email.trim();
        phone = phone.trim();
        address = address.trim();

        const newComer = {
            name: name,
            lastName: lastName,
            age: age,
            email: email,
            phone: phone,
            address: address,
        };
        setName("");
        setLastName("");
        setAge("");
        setEmail("");
        setPhone("");
        setAddress("");
        // Post new user
        try {
            const response = await axios.post(`http://${httpAddress}:3001/newComers`, newComer);
            if (response.status === 200 && response.status < 300) {
                navigation.navigate("Successful");
            }else if (response.status === 409) {
                setErrorMessage("Someone with the same details already exists.");
                errorTimeout = setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
          } catch (error) {
            if (error.response.status === 409) {
                setErrorMessage("Someone with the same details already exists.");
                setName(name);
                setLastName(lastName);  
                setAge(age);
                setEmail(email);
                setPhone(phone);
                setAddress(address);
              errorTimeout = setTimeout(() => { 
                setErrorMessage("");
              }, 10000);
            } else {
                setFetchingError(true);
                errorTimeout = setTimeout(() => {
                setErrorMessage("");
                }, 3000);
            }
          }
        }

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
                <View style={container}>
                    <Text style={header}>Add new comer</Text>
                    <View style={goBackBtn}>
                        <Button
                            title="Cancel"
                            onPress={() => navigation.navigate("Home Screen")}
                        />
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
                            value={age}
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
                        <TouchableOpacity onPress={() => addNewUser(name, lastName, age, email, phone, address)}>
                            <Text style={buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    );
};

export default AddComer;