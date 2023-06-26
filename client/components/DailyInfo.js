import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import HeaderText from "./HeaderText";
import { useState } from "react";
import SubText from "./SubText";
import HealthIndex from "./HealthIndex";
const DailyInfo = () => {
  const [emotion, setEmotion] = useState("level5");
  const handleEmotion = (level) => {
    setEmotion(level);
  };
  return (
    <View style={styles.containerToday}>
      <HeaderText style={styles.headertext}>HOW IS BABY BEE TODAY?</HeaderText>
      <View style={styles.containeremotion}>
        <TouchableOpacity
          style={{
            height: 32,
            width: 32,
            justifyContent: "center",
            alignItems: "center",
          }}
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
          style={{
            height: 32,
            width: 32,
            justifyContent: "center",
            alignItems: "center",
          }}
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
          style={{
            height: 32,
            width: 32,
            justifyContent: "center",
            alignItems: "center",
          }}
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
          style={{
            height: 32,
            width: 32,
            justifyContent: "center",
            alignItems: "center",
          }}
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
          style={{
            height: 32,
            width: 32,
            justifyContent: "center",
            alignItems: "center",
          }}
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
      <View style={{ paddingHorizontal: 13, flexDirection: "row" }}>
        <HealthIndex></HealthIndex>
      </View>
    </View>
  );
};

export default DailyInfo;

const styles = StyleSheet.create({
  containerToday: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 238, 1)",
    width: "100%",
    height: 170,
    borderRadius: 5,
    shadowColor: "rgba (0.1, 0.1, 0.1, 0.2)",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // display: "flex",
    paddingVertical: 10,
  },
  headertext: {
    fontSize: 20,
    color: "rgba(255, 150, 0, 1)",
    paddingLeft: 17,
    flex: 2,
    // backgroundColor: "#003",
    paddingBottom: -10,
  },
  containeremotion: {
    flexDirection: "row",
    gap: 5,
    flex: 2,
    marginRight: 35,
    marginLeft: 35,
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#000",
  },
});
