import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import HeaderText from "../../components/HeaderText";
import BabyDiary from "./BabyDiary";
import Allergy from "./Allergy";

const DiaryHome = () => {
  const [activeTab, setActiveTab] = useState("Baby");
  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };
  const renderCommunity = () => {
    switch (activeTab) {
      case "Baby":
        return <BabyDiary></BabyDiary>;
      case "Allergy":
        return <Allergy></Allergy>;
      default:
        return null;
    }
  };
  return (
    <View style={{ backgroundColor: "#000", flex: 1 }}>
      <LinearGradient
        colors={["#F4FEE2", "#FDFDFD", "#FDFDFD"]}
        locations={[0, 0.215, 1]}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 30, paddingHorizontal: 25 }}>
            <HeaderText style={styles.HeaderText}>Diary</HeaderText>
          </View>
          <View style={styles.headerTab}>
            <TouchableOpacity
              onPress={() => handleTabPress("Baby")}
              style={
                activeTab === "Baby"
                  ? {
                      ...styles.tab,
                      borderBottomWidth: 2,
                      borderBottomColor: "#8CC840",
                    }
                  : styles.tab
              }
            >
              <HeaderText
                style={activeTab === "Baby" ? styles.Text : styles.TextActive}
              >
                Baby
              </HeaderText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTabPress("Allergy")}
              style={
                activeTab === "Allergy"
                  ? {
                      ...styles.tab,
                      borderBottomWidth: 2,
                      borderBottomColor: "#8CC840",
                    }
                  : styles.tab
              }
            >
              <HeaderText
                style={
                  activeTab === "Allergy" ? styles.Text : styles.TextActive
                }
              >
                Allergy
              </HeaderText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTabPress("HandBook")}
              style={
                activeTab === "HandBook"
                  ? {
                      ...styles.tab,
                      borderBottomWidth: 2,
                      borderBottomColor: "#8CC840",
                    }
                  : styles.tab
              }
            >
              <HeaderText
                style={
                  activeTab === "HandBook" ? styles.Text : styles.TextActive
                }
              >
                HandBook
              </HeaderText>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>{renderCommunity()}</View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default DiaryHome;

const styles = StyleSheet.create({
  headerTab: {
    flexDirection: "row",
    gap: 60,
    paddingTop: 15,
    paddingHorizontal: 25,
  },
  HeaderText: {
    color: "#518B1A",
    fontSize: 20,
  },
  Text: {
    color: "#8CC840",
    fontSize: 20,
  },
  TextActive: {
    color: "rgba(26, 26, 26, 0.50)",
    fontSize: 12,
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
  },
});
