import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import AddComer from './components/AddNewComers';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import Successful from './components/Successful';
import UpdateComer from './components/UpdateComer';
import SuccessfulUpdate from './components/SuccessfulUpdate';
import ShowError from './components/ShowError';
import Search from './components/Search';

const Stack = createStackNavigator();
Stack.Navigator.defaultProps = {
  screenOptions: {
    headerShown: false,
    AnimationEnabled: false,
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Add new" component={AddComer} options={{headerShown: false}}/>
        <Stack.Screen name="Successful" component={Successful} options={{headerShown: false}}/>
        <Stack.Screen name="UpdateComer" component={UpdateComer} options={{headerShown: false}}/>
        <Stack.Screen name="Updated" component={SuccessfulUpdate} options={{headerShown: false}}/>
        <Stack.Screen name="Error" component={ShowError} options={{headerShown: false}}/>
        <Stack.Screen name="Search" component={Search} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}