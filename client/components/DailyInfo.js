import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import HeaderText from "./HeaderText";
import { useState } from "react";
import SubText from "./SubText";
const DailyInfo = () => {
  const [emotion, setEmotion] = useState();
  const handleEmotion = (level) => {
    setEmotion(level);
  };
  return (
    <View style={styles.containerToday}>
      <HeaderText style={styles.headertext}>HOW IS BABY BEE TODAY?</HeaderText>
      <View style={styles.containeremotion}>
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={() => handleEmotion("level1")}
        >
          <Image
            source={
              emotion == "level1"
                ? require("../assets/icon/Emotion/level11.png")
                : require("../assets/icon/Emotion/level1.png")
            }
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={() => handleEmotion("level2")}
        >
          <Image
            source={
              emotion == "level2"
                ? require("../assets/icon/Emotion/level22.png")
                : require("../assets/icon/Emotion/level2.png")
            }
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={() => handleEmotion("level3")}
        >
          <Image
            source={
              emotion == "level3"
                ? require("../assets/icon/Emotion/level33.png")
                : require("../assets/icon/Emotion/level3.png")
            }
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={() => handleEmotion("level4")}
        >
          <Image
            source={
              emotion == "level4"
                ? require("../assets/icon/Emotion/level44.png")
                : require("../assets/icon/Emotion/level4.png")
            }
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={() => handleEmotion("level5")}
        >
          <Image
            source={
              emotion == "level5"
                ? require("../assets/icon/Emotion/level55.png")
                : require("../assets/icon/Emotion/level5.png")
            }
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.inforItemContainer}>
        <SubText style={styles.lastupdatetext}>Last updated 15/04/2023</SubText>
        <View style={styles.informationContainer}>
          <View style={styles.inforItem}>
            <View style={{ flexDirection: "column" }}>
              <SubText style={styles.inforItemText}>90kg</SubText>
              <SubText style={styles.nameItemText}>Weight</SubText>
            </View>
            <View style={{ flexDirection: "column" }}>
              <SubText style={styles.inforItemText}>200cm</SubText>
              <SubText style={styles.nameItemText}>Height</SubText>
            </View>
            <View style={{ flexDirection: "column" }}>
              <SubText style={styles.BMIItemText}>80</SubText>
              <SubText style={styles.nameItemText}>BMI</SubText>
            </View>
          </View>

          <TouchableOpacity style={styles.updatebtn}>
            <SubText style={styles.updateText}>Update</SubText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DailyInfo;

const styles = StyleSheet.create({
  containerToday: {
    backgroundColor: "rgba(255, 255, 238, 1)",
    width: "100%",
    height: 170,
    borderRadius: 5,
    shadowColor: "rgba (0.1, 0.1, 0.1, 0.2)",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headertext: {
    fontSize: 20,
    color: "rgba(255, 150, 0, 1)",
    marginLeft: 17,
    marginTop: 15,
  },
  containeremotion: {
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
    marginRight: 35,
    marginLeft: 35,
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastupdatetext: {
    color: "rgba(140, 140, 140, 1)",
    fontStyle: "normal",
    fontSize: 13,
    fontWeight: "bold",
  },
  inforItem: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inforItemText: {
    color: "#1A1A1A",
  },
  nameItemText: {
    color: "rgba(140, 140, 140, 1)",
    fontSize: 12,
  },
  BMIItemText: {
    color: "#518B1A",
    fontSize: 20,
  },
  itemContainer: {
    flexDirection: "column",
  },
  inforItemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    boxShadow: "inset 0px 0px 4px rgba(26, 26, 26, 0.2)",
    marginLeft: 13,
    marginRight: 13,
    paddingVertical: 9,
    paddingHorizontal: 17,
  },
  updateText: { color: "#518B1A", fontSize: 14 },
  updatebtn: {
    backgroundColor: "rgba(140, 200, 64, 0.2)",
    width: 80,
    height: 32,
    marginLeft: 25,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    shadowColor: "rgba(26, 26, 26, 0.2)",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 2,
  },
  informationContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});
