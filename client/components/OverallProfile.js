import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import HeaderText from "./HeaderText";
import { LinearGradient } from "expo-linear-gradient";
import SubText from "./SubText";

const OverallProfile = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/coverPhoto.png")}
        style={styles.coverImage}
      >
        <LinearGradient
          colors={["rgba(26, 26, 26, 0.00)", "rgba(26, 26, 26, 0.40)"]}
          style={{ flex: 1 }}
        ></LinearGradient>
      </ImageBackground>
      <View style={styles.containerProfile}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require("../assets/images/Avatar.png")}
          ></Image>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.containerName}>
            <HeaderText style={styles.nameMom}>ME RONG</HeaderText>
            <TouchableOpacity>
              <Image
                source={require("../assets/icon/Iconedit.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inforMomContainer}>
            <View style={styles.inforMom}>
              <Image
                source={require("../assets/icon/Iconjob.png")}
                style={styles.icon}
                resizeMode="contain"
              ></Image>
              <SubText style={{ color: "#fff" }}>Housewife</SubText>
            </View>
            <View style={styles.inforMom}>
              <Image
                source={require("../assets/icon/Iconbaby.png")}
                style={styles.icon}
                resizeMode="contain"
              ></Image>
              <SubText style={{ color: "#fff" }}>1 baby </SubText>
            </View>
          </View>
          <View style={styles.inforItem}>
            <View style={{ flexDirection: "column", marginTop: "auto" }}>
              <SubText style={styles.inforItemText}>100</SubText>
              <SubText style={styles.nameItemText}>Menu</SubText>
            </View>
            <View style={{ flexDirection: "column", marginTop: "auto" }}>
              <SubText style={styles.inforItemText}>50</SubText>
              <SubText style={styles.nameItemText}>Posts</SubText>
            </View>
            <View style={{ flexDirection: "column", marginTop: "auto" }}>
              <SubText style={styles.inforItemText}>50</SubText>
              <SubText style={styles.nameItemText}>Like</SubText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OverallProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerProfile: {
    flexDirection: "row",
    marginTop: -60,
    paddingHorizontal: 25,
    paddingBottom: 1,
    gap: 10,
  },
  coverImage: {
    flex: 1,
    width: "100%",
  },
  avatarContainer: {
    backgroundColor: "#fff",
    borderRadius: 50,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  avatar: {
    height: 100,
    width: 100,
  },
  icon: {
    // height: 12,
    width: 12,
    height: 12,
  },
  inforMomContainer: {
    flexDirection: "row",
    // backgroundColor: "#000",
    marginTop: 10,
  },
  inforMom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingRight: 18,
  },
  inforItem: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 45,
    // backgroundColor: "#000",
  },
  inforItemText: {
    color: "#1A1A1A",
    fontSize: 16,
  },
  nameItemText: {
    color: "rgba(140, 140, 140, 1)",
    fontSize: 12,
  },
  nameMom: {
    color: "#fff",
    fontSize: 20,
  },
  containerName: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
