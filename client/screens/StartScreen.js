import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import googleIcon from "../assets/images/google.png";
import facebookIcon from "../assets/images/facebook.png";
import twitterIcon from "../assets/images/twitter.png";
import VerticalLogo from "../assets/images/verticalLogo.png";
// import { handleGoogleLogin } from "../Services/GoogleSingIn";
import { useEffect, useState } from "react";
import { Linking, Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";

const handleRedirect = (event) => {
  const url = event.url;

  if (url && url.includes("YOUR_SUCCESS_REDIRECT_URL")) {
    WebBrowser.dismissBrowser();
    const navigation = useNavigation();
    navigation.navigate("Home"); // Replace 'Home' with the name of the screen you want to navigate to
  }
};

const StartScreen = ({ navigation }) => {
  const handleDeepLink = (event) => {
    const { url } = event;
    console.log(url);
    if (url.startsWith("exp://192.168.31.40:19000/success")) {
      console.log("cc");
      // Handle the deep link here, for example, navigate to the desired screen in your app.
      WebBrowser.dismissBrowser();
      // navigation.replace("BottomNavigation"); // Replace with the screen name you want to navigate to.
    }
  };

  useEffect(() => {
    // Add the event listener for handling the URL redirect after Google login
    Linking.addEventListener("url", handleRedirect);

    // Remove the event listener when the component unmounts to avoid memory leaks
    return () => {
      Linking.removeEventListener("url", handleRedirect);
    };
  }, []);
  return (
    <View style={styles.Container}>
      <View style={styles.Btn}>
        <Image style={[styles.VerticalLogo]} source={VerticalLogo} />
        <TouchableOpacity
          style={styles.SignInBtn}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={styles.btnText}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SignUpBtn}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.btnText}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 40 }}>Hoặc đăng nhập bằng</Text>
        <View style={styles.IconContainer}>
          <TouchableOpacity onPress={() => handleGoogleLogin()}>
            <Image
              style={[styles.icon, { marginRight: 10 }]}
              source={googleIcon}
            />
          </TouchableOpacity>

          <Image
            style={[styles.icon, { marginRight: 10 }]}
            source={facebookIcon}
          />
          <Image style={styles.icon} source={twitterIcon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    backgroundColor: "#fff",
  },
  VerticalLogo: {
    width: 217,
    height: 69,
    marginBottom: 32,
  },
  Btn: {
    position: "absolute",
    width: 184,
    height: 99,
    top: 353,
    alignItems: "center",
    justifyContent: "center",
  },
  SignInBtn: {
    backgroundColor: "#518B1A",
    shadowColor: "rgba(26, 26, 26, 0.2)",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    width: 184,
    height: 42,
    shadowOpacity: 1,
    shadowRadius: 4,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  SignUpBtn: {
    backgroundColor: "#8CC840",
    shadowColor: "rgba(26, 26, 26, 0.2)",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    marginTop: 15,
    width: 184,
    height: 42,
    shadowOpacity: 1,
    shadowRadius: 4,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  IconContainer: {
    flexDirection: "row",
    marginTop: 17,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default StartScreen;
