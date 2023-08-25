import React, { useRef, useEffect } from "react";
import { View, Text, Animated, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const SuccessfulUpdate = ({ navigation }) => {
  const opacityValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the opacity and scale
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleHomePress = () => {
    navigation.navigate("Home Screen");
  };
  
  return (
    <SafeAreaView style={[styles.container, ]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
          <View style={styles.centeredContent}>
            <Animated.View
            style={{
                opacity: opacityValue,
                transform: [{ scale: scaleValue }],
            }}
            >
            <FontAwesomeIcon icon={faCheck} size={100} color="green" />
            </Animated.View>
            <Text style={{ marginTop: 20, fontSize: 20 }}>Successful</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <View>
                <TouchableOpacity onPress={handleHomePress} style={[styles.button, { backgroundColor: "#ccc", color: "#000" }]}>
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
            </View>
          </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonsContainer: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      paddingVertical: 20,
      paddingBottom: 20,
      position: 'absolute',
      bottom: 0,
      width: '90%',
  },
  button: {
      padding: 10,
      borderRadius: 5,
      // width: 350,
      alignItems: 'center',
  },
  text: {
      fontSize: 20,
  },
});
export default SuccessfulUpdate;
