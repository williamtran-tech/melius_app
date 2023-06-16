// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from "react";
import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomHeader from "../components/WelcomHeader";
import DailyInfo from "../components/DailyInfo";
const HomeScreen = () => {
  const [test, setTest] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("user_id").then((result) => {
      setTest(result);
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View>
        <WelcomHeader></WelcomHeader>
      </View>
      <View style={styles.container}>
        <DailyInfo></DailyInfo>
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: -85,
  },
});
