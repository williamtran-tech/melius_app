import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { Button } from "react-native";

const ProfileScreen = ({ navigation }) => {
  const logout = () => {
    fetch("http://192.168.102.100:5050/api/v1/auth/logout", {
      method: "GET",
      headers: {
        //Header Defination
        "Content-Type": "application/x-www-form-urlencoded",
        credentials: "include",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        // AsyncStorage.clear();
        // navigation.replace("Auth");
      })
      .catch((error) => {
        //Hide Loader
        console.error(error);
      });
  };
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={logout}
        style={{ marginHorizontal: 100, marginVertical: 100 }}
      >
        <Text>LogOut</Text>
        <Text>{t("welcome")}</Text>
      </TouchableOpacity>
      <Button title="Tien Anh" onPress={() => changeLanguage("en")} />
      <Button
        title="Tieng Diet"
        onPress={() => changeLanguage("vi")}
        style={{ marginVertical: 100 }}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
