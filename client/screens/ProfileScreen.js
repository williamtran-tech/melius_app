import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import OverallProfile from "../components/OverallProfile";
import PersonalInf from "../components/PersonalInf";
import ChildrenInf from "../components/ChildrenInf";
import Setting from "../components/Setting";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const [childInf, setChildInf] = useState();
  AsyncStorage.getItem("childrenInf").then((value) => {
    setChildInf(JSON.parse(value));
  });
  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      <View style={{ flex: 2 }}>
        <OverallProfile></OverallProfile>
      </View>
      <View style={{ flex: 4, paddingHorizontal: 25 }}>
        <PersonalInf></PersonalInf>
        <ChildrenInf childInf={childInf}></ChildrenInf>
      </View>
      <View style={{ flex: 2 }}>
        <Setting></Setting>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
