import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";
import CalendarStrip from "react-native-calendar-strip";

const WeekCalendar = ({ selectedDate, setSelectedDate }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        PaytoneOne: require("../assets/fonts/PaytoneOne-Regular.ttf"),
      });
      setFontLoaded(true);
    };
    loadFonts();
  }, []);
  if (!fontLoaded) {
    return null; // or render a loading indicator
  }

  return (
    <CalendarStrip
      scrollerPaging
      style={{ height: 120, paddingTop: 20, paddingBottom: 10 }}
      calendarHeaderStyle={{
        color: "#8CC840",
        fontFamily: "PaytoneOne",
        marginRight: "auto",
        fontSize: 20,
        paddingLeft: 20,
      }}
      dateNumberStyle={{ color: "#000", fontSize: 18 }}
      dateNameStyle={{ color: "rgba(26, 26, 26, 0.50)", paddingBottom: 10 }}
      highlightDateContainerStyle={{
        backgroundColor: "#FED800",
        borderRadius: 10,
        paddingHorizontal: 5,
      }}
      highlightDateNumberStyle={{
        color: "#518B1A",
      }}
      highlightDateNameStyle={{
        paddingBottom: 10,
        color: "#518B1A",
      }}
      calendarHeaderFormat={"MMMM"}
      selectedDate={selectedDate}
      onDateSelected={(value) => {
        console.log(value);
      }}
    />
  );
};

export default WeekCalendar;
