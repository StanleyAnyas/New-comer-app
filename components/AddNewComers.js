import React, { useState } from "react";
import { TextInput, View, Button, Text, TouchableWithoutFeedback  } from "react-native";
import { styleForm } from "../style/styling";
import { PhoneNumberUtil } from "google-libphonenumber";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { postNewComer } from "../my-backend/database";

const AddComer = () => {
    const { container, input, button, buttonText, errorMessageStyle, header, fieldContainer, fieldLabel } = styleForm;
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    let errorTimeout;
    const addNewUser = async (name, lastName, age, email, phone, address) => {
        clearTimeout(errorTimeout);

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
        const phoneUtil = PhoneNumberUtil.getInstance();
        try {
            const phoneNumber = phoneUtil.parseAndKeepRawInput(phone, "SE"); // the second parameter is the default region (ISO 3166-1 alpha-2)
            if (!phoneUtil.isValidNumber(phoneNumber)) {
                setErrorMessage("Please enter a valid phone number");
                errorTimeout = setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
                return;
            }
        } catch (err) {
            setErrorMessage("Please enter a valid phone number");
            errorTimeout = setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return;
        }

        const newComer = {
            name: name,
            lastName: lastName,
            age: age,
            email: email,
            phone: phone,
            address: address,
        };
        console.log(newComer);
        // clear input fields
        setName("");
        setLastName("");
        setAge("");
        setEmail("");
        setPhone("");
        setAddress("");
        // Post new user
        try {
            const response = await postNewComer(newComer);
            if (response.status === 200) {
              setSuccessMessage("Added successfully");
              navigation.navigate("Successful");
            } else {
              setErrorMessage("Something went wrong, please try again");
              errorTimeout = setTimeout(() => {
                setErrorMessage("");
              }, 3000);
            }
          } catch (error) {
            console.log("Error:", error);
            setErrorMessage("An error occurred, please try again");
            errorTimeout = setTimeout(() => {
              setErrorMessage("");
            }, 3000);
          }
        }

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
                    <View style={[button, buttonText]} >
                        <Button
                            title="Save"
                            onPress={() => addNewUser(name, lastName, age, email, phone, address)}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    );
};

export default AddComer;