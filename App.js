import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { style } from './style/styling';
import AddComer from './components/AddNewComers';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import Successful from './components/Successful';
import UpdateComer from './components/UpdateComer';
import SuccessfulUpdate from './components/SuccessfulUpdate';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen}options={{headerShown: false}}/>
        <Stack.Screen name="Add new" component={AddComer} options={{headerShown: false}}/>
        <Stack.Screen name="Successful" component={Successful} options={{headerShown: false}}/>
        <Stack.Screen name="UpdateComer" component={UpdateComer} options={{headerShown: false}}/>
        <Stack.Screen name="Updated" component={SuccessfulUpdate} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}