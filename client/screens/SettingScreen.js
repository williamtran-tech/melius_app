// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
// import CustomSwitch from 'react-native-custom-switch';

const SettingsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        {/* <CustomSwitch 
  switchLeftText={"☀️"}
  switchRightText={"🌙"}
/> */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            on developing
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
