import React, { useEffect } from 'react';
import { View, Button, TouchableOpacity, Text, SafeAreaView, Image } from 'react-native';
import { style } from '../style/styling';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetNewComers from './GetNewComers';
import logo from '../image/watchman-logo.jpeg';

const HomeScreen = ({ navigation }) => {

  useEffect(() => {
    navigation.addListener('focus', () => {
      <GetNewComers />
    });
  }, []);
  return (
    <SafeAreaView style={style.container}>
        <View style={style.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Add new')} style={style.button}>
                <Text>Add new </Text>
            </TouchableOpacity>
            <View>
                <Image source={logo} style={style.logo} />
            </View>
        </View>
        <GetNewComers />
    </SafeAreaView>
  );
};

export default HomeScreen;
