import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderText from "./HeaderText";
import SubText from "./SubText";

const InstructionCook = ({ data }) => {
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <View>
      {data &&
        data.steps.map((step, index) => (
          <View style={styles.menuItemInf} key={index}>
            <View style={styles.stepNum}>
              <SubText>{index < 9 ? "0" + (index + 1) : index + 1}</SubText>
            </View>
            <View style={styles.menuItemText}>
              <SubText style={styles.menuDescription}>
                {capitalizeFirstLetter(step)}
              </SubText>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/images/menuItem.png")}
                style={{ height: 50, width: 66 }}
              ></Image>
            </View>
          </View>
        ))}
    </View>
  );
};

export default InstructionCook;

const styles = StyleSheet.create({
  menuItemInf: {
    flexDirection: "row",
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: "#fff",
    borderBottomColor: "#8CC840",
    borderBottomWidth: 1,
  },
  menuItemTitle: {
    color: "#518B1A",
    fontSize: 14,
  },
  menuItemText: {
    flex: 3,
    // backgroundColor: "#000",
  },
  menuDescription: {
    fontSize: 12,
    lineHeight: 16,
    // overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "#FFFFEE",
  },
  stepNum: {
    justifyContent: "center",
    alignItems: "flex-start",
    fontSize: 18,
    flex: 1,
  },
});
