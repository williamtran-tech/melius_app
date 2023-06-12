import React from "react";
import {
  SafeAreaViewBase,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
      {/* <View style={styles.Btn}>
        <Image style={[styles.VerticalLogo]} source={VerticalLogo} />
        <TouchableOpacity
          style={styles.SignInBtn}
          onPress={() => console.log("Button pressed")}
        >
          <Text style={styles.btnText}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SignUpBtn}
          onPress={() => console.log("Button pressed")}
        >
          <Text style={styles.btnText}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 40 }}>Hoặc đăng nhập bằng</Text>
        <View style={styles.IconContainer}>
          <Image
            style={[styles.icon, { marginRight: 10 }]}
            source={googleIcon}
          />
          <Image
            style={[styles.icon, { marginRight: 10 }]}
            source={facebookIcon}
          />
          <Image style={styles.icon} source={twitterIcon} />
        </View>
      </View> */}
      <Button
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Press Here</Text>
      </TouchableOpacity>
      <Text style={styles.text}>ccc</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#f0f0f0",
  },
});
