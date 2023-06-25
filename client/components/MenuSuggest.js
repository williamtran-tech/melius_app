import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderText from "./HeaderText";
import { ScrollView } from "react-native-gesture-handler";
import SubText from "./SubText";

const MenuSuggest = () => {
  return (
    <View>
      <HeaderText style={{ fontSize: 18, color: "#518B1A", paddingLeft: 25 }}>
        Handbook of suggestions
      </HeaderText>
      <ScrollView>
        <View style={styles.menuItemInf}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/menuItem.png")}
              style={{ height: 83, width: 121 }}
            ></Image>
          </View>

          <View style={styles.menuItemText}>
            <HeaderText style={styles.menuItemTitle}>
              Nutritious snack for kids
            </HeaderText>
            <SubText
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.menuDescription}
            >
              Delicious snacks for your baby but guaranteed Delicious snacks for
              your baby but guaranteed Delicious snacks for your baby but
            </SubText>
          </View>
        </View>
        <View style={styles.menuItemInf}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/menuItem.png")}
              style={{ height: 83, width: 121 }}
            ></Image>
          </View>

          <View style={styles.menuItemText}>
            <HeaderText style={styles.menuItemTitle}>
              Nutritious snack for kids
            </HeaderText>
            <SubText
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.menuDescription}
            >
              Delicious snacks for your baby but guaranteed Delicious snacks for
              your baby but guaranteed Delicious snacks for your baby but
            </SubText>
          </View>
        </View>
        <View style={styles.menuItemInf}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/menuItem.png")}
              style={{ height: 83, width: 121 }}
            ></Image>
          </View>

          <View style={styles.menuItemText}>
            <HeaderText style={styles.menuItemTitle}>
              Nutritious snack for kids
            </HeaderText>
            <SubText
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.menuDescription}
            >
              Delicious snacks for your baby but guaranteed Delicious snacks for
              your baby but guaranteed Delicious snacks for your baby but
            </SubText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MenuSuggest;

const styles = StyleSheet.create({
  menuItemInf: {
    flexDirection: "row",
    marginHorizontal: 25,
    gap: 20,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#1A1A1A",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 4,
  },
  menuItemTitle: {
    color: "#518B1A",
    fontSize: 14,
  },
  menuItemText: {
    flex: 1,
    // backgroundColor: "#000",
  },
  menuDescription: {
    color: "#8C8C8C",
    fontSize: 12,
    lineHeight: 16,
    overflow: "hidden",
  },
  imageContainer: {
    backgroundColor: "#FFFFEE",
  },
});
