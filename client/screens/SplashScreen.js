import verticallogo from "../assets/images/verticalLogo.png";
import React, { useState, useEffect, useRef } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      AsyncStorage.getItem("cookies").then((value) =>
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
