import { Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";
import url from "url";

// import { NavigationContainerRef } from "@react-navigation/native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const handleRedirect = (event) => {
  // On iOS, the URL is passed directly, while on Android, you need to extract it from the event
  const url = event.url || event;

  // Check if the URL contains the success redirect URL you expect after a successful login
  if (
    url &&
    url.includes(
      "https://melius-service.onrender.com/api/v1/auth/google/callback/success#"
    )
  ) {
    // Close the browser window
    WebBrowser.dismissBrowser();

    // Navigate to the bottom navigation screen
    // const navigation = useNavigation();
    // navigation.navigate("YourBottomNavigationScreen");
  } else {
    console.log("noooooooo");
  }
};
export const handleGoogleLogin = async () => {
  const googleLoginURL =
    "https://melius-service.onrender.com/api/v1/auth/google";
  try {
    const login = await WebBrowser.openAuthSessionAsync(googleLoginURL);
    if (login.type === "success") {
      // Remove the fragment identifier if it exists
      const url_token = login.url.split("#")[0];

      // console.log("URL: ", url_token);
      const urlParser = url.parse(url_token, true);
      // console.log("Token:", urlParser.query.token);
      // console.log("Is New:", urlParser.query.new);
      // console.log("Kid:", urlParser.query.kidIds);
      // if (urlParser.query.token) {
      //   await AsyncStorage.setItem("Authentication", urlParser.query.token);
      // }
      return urlParser.query;
    }
  } catch (error) {
    console.error("Error opening Google login URL:", error);
  }
};
