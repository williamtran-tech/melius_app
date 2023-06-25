// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from "react";
import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomHeader from "../components/WelcomHeader";
import DailyInfo from "../components/DailyInfo";
import Remind from "../components/Remind";
import MenuSuggest from "../components/MenuSuggest";
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
        <View style={styles.DaylyInfcontainer}>
          <DailyInfo></DailyInfo>
        </View>
        <View style={styles.ReminderContainer}>
          <Remind></Remind>
        </View>
        <View style={styles.MenuContainer}>
          <MenuSuggest></MenuSuggest>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -85,
    backgroundColor: "hsla(51, 100%, 50%, 0)",
  },
  DaylyInfcontainer: {
    flex: 1,
    paddingHorizontal: 15,
    // backgroundColor: "#000",
  },
  ReminderContainer: { flex: 1 },
  MenuContainer: {
    flex: 2,
  },
});
