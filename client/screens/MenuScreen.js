import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HeaderText from "../components/HeaderText";
import { useState } from "react";
import MonthCalendar from "../components/MonthCalendar";
import WeekCalendar from "../components/WeekCalendar";

const MenuScreen = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [selectedDate, setSelectedDate] = useState("2023-06-29");

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const renderCalendar = () => {
    switch (activeTab) {
      case "daily":
        return (
          <WeekCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          ></WeekCalendar>
        );
      case "week":
      case "month":
        return (
          <MonthCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          ></MonthCalendar>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      <View style={styles.headerTab}>
        <TouchableOpacity
          onPress={() => handleTabPress("daily")}
          style={
            activeTab === "daily"
              ? {
                  ...styles.tab,
                  borderBottomWidth: 2,
                  borderBottomColor: "#518B1A",
                }
              : styles.tab
          }
        >
          <HeaderText
            style={activeTab === "daily" ? styles.Text : styles.TextActive}
          >
            Daily
          </HeaderText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress("week")}
          style={
            activeTab === "week"
              ? {
                  ...styles.tab,
                  borderBottomWidth: 2,
                  borderBottomColor: "#518B1A",
                }
              : styles.tab
          }
        >
          <HeaderText
            style={activeTab === "week" ? styles.Text : styles.TextActive}
          >
            Week
          </HeaderText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabPress("month")}
          style={
            activeTab === "month"
              ? {
                  ...styles.tab,
                  borderBottomWidth: 2,
                  borderBottomColor: "#518B1A",
                }
              : styles.tab
          }
        >
          <HeaderText
            style={activeTab === "month" ? styles.Text : styles.TextActive}
          >
            Month
          </HeaderText>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal:25}}>{renderCalendar()}</View>
    </View>
  );
};

export default MenuScreen;
const styles = StyleSheet.create({
  headerTab: {
    flexDirection: "row",
    gap: 35,
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  Text: {
    color: "#518B1A",
    fontSize: 16,
  },
  TextActive: {
    color: "rgba(26, 26, 26, 0.50)",
    fontSize: 12,
  },
  tab: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});