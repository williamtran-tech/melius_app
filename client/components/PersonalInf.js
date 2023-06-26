import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import HeaderText from "./HeaderText";
import SubText from "./SubText";
import IconWithText from "./IconWithText";

const PersonalInf = () => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <HeaderText style={{ color: "#518B1A", fontSize: 18 }}>
          Personal information
        </HeaderText>
        <TouchableOpacity style={styles.updatebtn}>
          <SubText style={styles.updateText}>Edit</SubText>
        </TouchableOpacity>
      </View>
      <View style={styles.infContainer}>
        <View style={styles.row1}>
          <IconWithText iconName="Iconfemale" title="Female"></IconWithText>
          <IconWithText iconName="Iconbirthday" title="Birthday"></IconWithText>
          <IconWithText iconName="Iconphone" title="0921122219"></IconWithText>
        </View>
        <View style={styles.row1}>
          <IconWithText
            iconName="Iconmail"
            title="abcd@gmail.com"
          ></IconWithText>
        </View>
        <View style={styles.row1}>
          <IconWithText
            iconName="IconAddress"
            title="67 August Revolution, Ward 11, Tan Binh District"
          ></IconWithText>
        </View>
      </View>
    </View>
  );
};

export default PersonalInf;

const styles = StyleSheet.create({
  infContainer: {
    flexDirection: "column",
    gap: 15,
    padding: 10,
    backgroundColor: "#fff",
    shadowOffset: {
      width: 1,
      height: -1,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 5,
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  updateText: { color: "#518B1A", fontSize: 12 },
  updatebtn: {
    backgroundColor: "rgba(140, 200, 64, 0.2)",
    width: 50,
    height: 30,
    // marginLeft: 25,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
