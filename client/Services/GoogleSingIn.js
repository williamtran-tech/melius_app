import { Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";

// import { NavigationContainerRef } from "@react-navigation/native";
import React from "react";
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
    // Open the login URL in the web browser
    let result = await WebBrowser.openAuthSessionAsync(googleLoginURL);

    // If the browser was dismissed without success, try handling the URL manually
    if (Platform.OS === "ios" && result.type === "cancel") {
      Linking.addEventListener("url", handleRedirect);
    }
  } catch (error) {
    console.error("Error opening Google login URL:", error);
  }
};
