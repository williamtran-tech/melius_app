import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import OverallProfile from "../components/OverallProfile";
import PersonalInf from "../components/PersonalInf";
import ChildrenInf from "../components/ChildrenInf";
import Setting from "../components/Setting";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      <View style={{ flex: 2 }}>
        <OverallProfile></OverallProfile>
      </View>
      <View style={{ flex: 4, paddingHorizontal: 25 }}>
        <PersonalInf></PersonalInf>
        <ChildrenInf></ChildrenInf>
      </View>
      <View style={{ flex: 2 }}>
        <Setting></Setting>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
