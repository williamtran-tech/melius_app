import { StyleSheet, Text, View, TouchableOpacity, Switch } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { Button } from "react-native";
// import LocalAuthentication from "react-native-local-authentication";
import * as LocalAuthentication from "expo-local-authentication";
import HandleApi from "../Services/HandleApi";
import { useNavigation } from "@react-navigation/native";
import SwitchSelector from "react-native-switch-selector";
import SubText from "./SubText";

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
    AsyncStorage.removeItem("Authentication", (error) => {
      if (error) {
        console.error(error);
      } else {
        // console.log('"Authentication" has been deleted.');
        navigation.replace("Auth");
        HandleApi.serverGeneral
          .get("/v1/auth/logout")
          .then((response) => {
            console.log(response.data);
            navigation.replace("Auth");
          })
          .catch((error) => {
            console.error(error.data);
          });
      }
    });
    // AsyncStorage.clear().then(console.log("cc"));
  };
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <SubText style={{ fontSize: 14 }}>Language</SubText>
        <View style={styles.SwitchContainer}>
          <SwitchSelector
            initial={0}
            onPress={(value) => changeLanguage(value)}
            textColor="#000"
            selectedColor="#518B1A"
            buttonColor="rgba(140, 200, 64, 0.2)"
            borderColor="rgba(140, 200, 64, 0.2)"
            fontSize={14}
            height={30}
            hasPadding
            options={[
              { label: "🇻🇳 VN", value: "vi" }, //images.feminino = require('./path_to/assets/img/feminino.png')
              { label: "🇺🇸 US", value: "en" }, //images.masculino = require('./path_to/assets/img/masculino.png')
            ]}
          />
        </View>
      </View>
      <View style={styles.settingItem}>
        <SubText style={{ fontSize: 14 }}>FaceID</SubText>
        <View style={styles.SwitchContainer}>
          <Switch></Switch>
        </View>
      </View>
      <View style={styles.Logout}>
        <TouchableOpacity onPress={logout}>
          <SubText
            style={{
              fontSize: 14,
              textAlign: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            Log out
          </SubText>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity onPress={logout}>
        <Text>LogOut</Text>
        <Text>{t("welcome")}</Text>
      </TouchableOpacity>
      <Button title="FaceID" onPress={() => handleFaceIDAuthentication()} /> */}
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: "flex-end",
  },
  settingItem: {
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  SwitchContainer: {
    width: 120,
    alignItems: "flex-end",
  },
  Logout: {
    backgroundColor: "#8CC840",
    height: 30,
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 15,
  },
});
