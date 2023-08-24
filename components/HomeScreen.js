import React from 'react';
import { View, Button, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { style } from '../style/styling';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetNewComers from './GetNewComers';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={style.container}>
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Add new')} style={style.button}>
                <Text>Add new </Text>
            </TouchableOpacity>
        </View>
        <GetNewComers />
    </SafeAreaView>
  );
};

export default HomeScreen;
