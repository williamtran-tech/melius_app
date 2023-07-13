import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import HeaderText from "../../components/HeaderText";
import ExpertScreen from "./ExpertScreen";
import { LinearGradient } from "expo-linear-gradient";

const ComHome = () => {
  const [activeTab, setActiveTab] = useState("Expert");
  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };
  const renderCommunity = () => {
    switch (activeTab) {
      case "Expert":
        // console.log(selectedDate);
        return <ExpertScreen></ExpertScreen>;
      case "Community":
      //    return (
      //      <MonthCalendar
      //        selectedDate={selectedDate}
      //        setSelectedDate={setSelectedDate}
      //      ></MonthCalendar>
      //    );
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
          <View style={styles.headerTab}>
            <TouchableOpacity
              onPress={() => handleTabPress("Expert")}
              style={
                activeTab === "Expert"
                  ? {
                      ...styles.tab,
                      borderBottomWidth: 2,
                      borderBottomColor: "#518B1A",
                    }
                  : styles.tab
              }
            >
              <HeaderText
                style={activeTab === "Expert" ? styles.Text : styles.TextActive}
              >
                Expert
              </HeaderText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTabPress("Community")}
              style={
                activeTab === "Community"
                  ? {
                      ...styles.tab,
                      borderBottomWidth: 2,
                      borderBottomColor: "#518B1A",
                    }
                  : styles.tab
              }
            >
              <HeaderText
                style={
                  activeTab === "Community" ? styles.Text : styles.TextActive
                }
              >
                Community
              </HeaderText>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>{renderCommunity()}</View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ComHome;

const styles = StyleSheet.create({
  headerTab: {
    flexDirection: "row",
    gap: 60,
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  Text: {
    color: "#518B1A",
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
