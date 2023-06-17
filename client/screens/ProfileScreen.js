import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { Button } from "react-native";
const ProfileScreen = ({ navigation }) => {
  const logout = () => {
    AsyncStorage.clear();
    navigation.replace("Auth");
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
