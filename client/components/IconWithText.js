import { StyleSheet, Image, View } from "react-native";
import React from "react";
import SubText from "./SubText";

const IconWithText = ({ iconName, title }) => {
  const iconPaths = {
    Iconfemale: require("../assets/icon/Iconfemale.png"),
    Iconmail: require("../assets/icon/Iconmail.png"),
    Iconname: require("../assets/icon/Iconname.png"),
    Iconphone: require("../assets/icon/Iconphone.png"),
    Iconyearold: require("../assets/icon/Iconyearold.png"),
    IconAddress: require("../assets/icon/IconAddress.png"),
    Iconbirthday: require("../assets/icon/Iconbirthday.png"),
  };

  const imagePath = iconPaths[iconName];

  return (
    <View style={styles.container}>
      <Image source={imagePath} style={styles.icon} resizeMode="contain" />
      <SubText style={styles.title}>{title}</SubText>
    </View>
  );
};

export default IconWithText;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  icon: {
    width: 12,
    height: 12,
  },
  title: {
    color: "rgba(140, 140, 140, 1)",
    fontSize: 12,
  },
});
