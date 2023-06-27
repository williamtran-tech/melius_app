import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import HeaderText from "./HeaderText";
import SubText from "./SubText";
import IconWithText from "./IconWithText";
import HealthIndex from "./HealthIndex";

const ChildrenInf = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.titleContainer}>
        <HeaderText style={{ color: "#518B1A", fontSize: 18 }}>
          Children's information
        </HeaderText>
        <TouchableOpacity style={styles.updatebtn}>
          <SubText style={styles.updateText}>Edit</SubText>
        </TouchableOpacity>
      </View>
      <View style={styles.infContainer}>
        <View style={styles.row1}>
          <IconWithText
            iconName="Iconname"
            title="Cristiano Ronaldo"
          ></IconWithText>
        </View>
        <View style={styles.row1}>
          <IconWithText iconName="Iconfemale" title="Felmale"></IconWithText>
          <IconWithText
            iconName="Iconbirthday"
            title="29/08/2019"
          ></IconWithText>
          <IconWithText iconName="Iconyearold" title="3 YO"></IconWithText>
        </View>
        <View style={styles.row2}>
          <HealthIndex></HealthIndex>
        </View>
      </View>
    </View>
  );
};

export default ChildrenInf;

const styles = StyleSheet.create({
  infContainer: {
    flexDirection: "column",
    gap: 15,
    padding: 10,
    backgroundColor: "#FFFFEE",
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
  row2: {
    // flex: 1,
    flexDirection: "row",
  },
});