import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { Button } from "react-native";
// import LocalAuthentication from "react-native-local-authentication";
import * as LocalAuthentication from "expo-local-authentication";
import HandleApi from "../Services/HandleApi";
import { useNavigation } from "@react-navigation/native";

const Setting = () => {
  const navigation = useNavigation();
  const handleFaceIDAuthentication = async () => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with Face ID",
        fallbackLabel: "Enter Passcode",
        cancelLabel: "Cancel",
      });

      if (success) {
        // Face ID authentication succeeded
        // Proceed with your login logic here
        console.log("Authentication succeeded");
      } else {
        // Face ID authentication failed
        console.log("Authentication failed");
      }
    } catch (error) {
      // An error occurred during Face ID authentication
      console.log("Authentication error:", error);
    }
  };
  const logout = () => {
    navigation.replace("Auth");
  }; // AsyncStorage.removeItem("Authentication", (error) => {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log('"Authentication" has been deleted.');
  //     HandleApi.serverGeneral
  //       .get("/v1/auth/logout")
  //       .then((response) => {
  //         console.log(response.data);
  //         navigation.replace("Auth");
  //       })
  //       .catch((error) => {
  //         console.error(error.data);
  //       });
  //   }
  // });
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <View>
      <TouchableOpacity onPress={logout}>
        <Text>LogOut</Text>
        <Text>{t("welcome")}</Text>
      </TouchableOpacity>
      <Button title="Tien Anh" onPress={() => changeLanguage("en")} />
      <Button title="Tieng Diet" onPress={() => changeLanguage("vi")} />
      <Button title="FaceID" onPress={() => handleFaceIDAuthentication()} />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({});
