import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React from 'react';
import { style } from './style/styling';
import AddComer from './components/AddNewComers';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import Successful from './components/Successful';
import UpdateComer from './components/UpdateComer';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen}/>
        <Stack.Screen name="Add new" component={AddComer}/>
        <Stack.Screen name="Successful" component={Successful}/>
        <Stack.Screen name="UpdateComer" component={UpdateComer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}