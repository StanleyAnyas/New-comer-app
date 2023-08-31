import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AddComer from './components/AddNewComers';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import Successful from './components/Successful';
import UpdateComer from './components/UpdateComer';
import SuccessfulUpdate from './components/SuccessfulUpdate';
import ShowError from './components/ShowError';
import Search from './components/Search';
import 'react-native-get-random-values';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="Home Screen"
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 0 } },
            close: { animation: 'timing', config: { duration: 0 } },
          },
        }}
      >
        <Stack.Screen name="Home Screen" component={HomeScreen} />
        <Stack.Screen name="Add new" component={AddComer} />
        <Stack.Screen name="Successful" component={Successful} />
        <Stack.Screen name="UpdateComer" component={UpdateComer} />
        <Stack.Screen name="Updated" component={SuccessfulUpdate} />
        <Stack.Screen name="Error" component={ShowError} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}