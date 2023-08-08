import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HeaderText from "./HeaderText";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const NavigatorMenu = ({ Date, ScreenName, navigationName, action }) => {
  const formattedDate = moment(Date, "DD-MM-YYYY").format("dddd, MMMM DD");
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {Date && <HeaderText style={styles.date}>{formattedDate}</HeaderText>}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
    textTransform: "capitalize",
  },
});
