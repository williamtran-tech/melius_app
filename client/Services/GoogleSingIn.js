import { Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";

// import { NavigationContainerRef } from "@react-navigation/native";
import React from "react";
export const handleGoogleLogin = async () => {
  const googleLoginURL =
    "https://melius-service.onrender.com/api/v1/auth/google";
  try {
    const login = await WebBrowser.openAuthSessionAsync(googleLoginURL);
    if (login.type === "success") {
      const token = login.url.split("token=")[1];
      console.log("Authorization Token: ", token);
    }
  } catch (error) {
    console.error("Error opening Google login URL:", error);
  }
};
