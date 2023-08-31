import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, SafeAreaView, Image, Text } from 'react-native';
import { style } from '../style/styling';
import { Feather, Ionicons } from '@expo/vector-icons';
import GetNewComers from './GetNewComers';
import logo from '../image/watchman-logo.jpeg';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import 'react-native-get-random-values';



const HomeScreen = ({ navigation }) => {

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack(null);
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setIsFocused(true);
    });
  }, []);

  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      setIsFocused(false);
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
