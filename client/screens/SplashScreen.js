import verticallogo from "../assets/images/verticalLogo.png";
import React, { useState, useEffect, useRef } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const checkAndCreateLanguageField = async () => {
    try {
      // Check if the 'language' field exists in AsyncStorage
      const existingLanguage = await AsyncStorage.getItem("language");

      if (existingLanguage === null) {
        await AsyncStorage.setItem("language", "US"); // You can set your default language value here
        console.log("Created language field in AsyncStorage");
      } else {
        console.log("Language field already exists in AsyncStorage");
      }
    } catch (error) {
      console.error("Error checking or creating language field:", error);
    }
  };
  useEffect(() => {
    checkAndCreateLanguageField();
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    // navigation.replace( "BottomNavigation")
    setTimeout(() => {
      AsyncStorage.getItem("Authentication").then((value) =>
        navigation.replace(value === null ? "Auth" : "BottomNavigation")
      );
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={verticallogo}
        style={[styles.image, { opacity: opacityAnim }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "90%",
    resizeMode: "contain",
    margin: 30,
  },
});

export default SplashScreen;
