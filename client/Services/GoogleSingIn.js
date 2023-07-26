import { Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";

// import { NavigationContainerRef } from "@react-navigation/native";
import React from "react";
export const handleGoogleLogin = async () => {
  const googleLoginURL =
    "https://melius-service.onrender.com/api/v1/auth/google";
  try {
    await WebBrowser.openAuthSessionAsync(googleLoginURL);
    console.log("okokokok");
  } catch (error) {
    console.error("Error opening Google login URL:", error);
  }
};
