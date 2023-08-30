import React, { useEffect, useState } from 'react';
import { View, Button, TouchableOpacity, Text, SafeAreaView, Image } from 'react-native';
import { style } from '../style/styling';
import { Feather, Ionicons } from '@expo/vector-icons';
import GetNewComers from './GetNewComers';
import logo from '../image/watchman-logo.jpeg';

const HomeScreen = ({ navigation }) => {

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      <GetNewComers />
    });
  }, []);

  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      setIsFocused(true);
    });

    return unsubcribe;
  }, [navigation]);

  const handleSearchPress = () => {
    // console.log('search');
    navigation.navigate('Search');
  };
  return (
    <SafeAreaView style={style.container}>
        <View style={style.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Add new')} style={style.button}>
                <Feather name="user-plus" size={32} color="rgba(0, 0, 0, 0.6)" />
            </TouchableOpacity>
            <View>
                <Image source={logo} style={style.logo} />
            </View>
            <View onStartShouldSetResponder={handleSearchPress}>
                <Ionicons name="search" size={32} color="rgba(0, 0, 0, 0.6)" />
            </View>
        </View>
        <GetNewComers isFocused={isFocused} />
    </SafeAreaView>
  );
};

export default HomeScreen;
