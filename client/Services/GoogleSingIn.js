import { Linking } from "react-native";
export const handleGoogleLogin = () => {
  const googleLoginURL = "http://192.168.102.101:5050/api/v1/auth/google"; // Replace with your Google login URL

  // Open the Google login URL in the default web browser
  Linking.openURL(googleLoginURL)
    .then(() => {
      console.log("Google login URL opened successfully");
    })
    .catch((error) => {
      console.error("Error opening Google login URL:", error);
    });
};
