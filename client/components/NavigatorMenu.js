import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HeaderText from "./HeaderText";
import moment from "moment";

const NavigatorMenu = ({
  Date,
  ScreenName,
  navigationName,
  navigation,
  action,
}) => {
  const formattedDate = moment(Date, "DD-MM-YYYY").format("dddd, MMMM D");
  return (
    <View style={styles.container}>
      <HeaderText style={styles.date}>{formattedDate}</HeaderText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <HeaderText style={styles.ScreenName}>❮ {ScreenName}</HeaderText>
        </TouchableOpacity>
        {action}
      </View>
    </View>
  );
};

export default NavigatorMenu;

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    flexDirection: "column",
    gap: 10,
  },
  date: {
    fontSize: 20,
    color: "#8CC840",
  },
  ScreenName: {
    fontSize: 18,
    color: "#518B1A",
  },
});
