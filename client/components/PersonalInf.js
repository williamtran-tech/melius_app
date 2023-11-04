import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderText from "./HeaderText";
import SubText from "./SubText";
import IconWithText from "./IconWithText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const PersonalInf = ({ flag }) => {
  const [momInfor, setMomInfor] = useState();
  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem("userProfile");
      console.log({ value });
      if (value) {
        const userProfile = JSON.parse(value);
        console.log("userProfileeeeee:", userProfile);
        // Check if the required data is available before setting the state
        setMomInfor(userProfile.userProfile);
      }
    } catch (error) {
      console.error("Error fetching userProfile from AsyncStorage:", error);
    }
  };
  useEffect(() => {
    console.log("Mount");
    fetchData();
    // Add a delay of 2 seconds before calling fetchData()
    // const delay = 2000; // 2 seconds in milliseconds
    // const timer = setTimeout(() => {
    //   fetchData();
    // }, delay);

    // // Clean up the timer when the component unmounts
    // return () => clearTimeout(timer);
  }, [flag]);
  return (
    <View>
      <View style={styles.titleContainer}>
        <HeaderText style={{ color: "#518B1A", fontSize: 18 }}>
          Personal informationnnn
        </HeaderText>
        <TouchableOpacity style={styles.updatebtn}>
          <SubText style={styles.updateText}>Edit</SubText>
        </TouchableOpacity>
      </View>
      <View style={styles.infContainer}>
        <View style={styles.row1}>
          <IconWithText
            iconName="Iconfemale"
            title={momInfor && momInfor.user.fullName}
          ></IconWithText>
          <IconWithText
            iconName="Iconbirthday"
            title={
              momInfor && moment(momInfor.user.DOB).format("MMMM DD, YYYY")
            }
          ></IconWithText>
          <IconWithText iconName="Iconphone" title="0921122219"></IconWithText>
        </View>
        <View style={styles.row1}>
          <IconWithText
            iconName="Iconmail"
            title={momInfor && momInfor.email}
          ></IconWithText>
        </View>
        <View style={styles.row1}>
          <IconWithText
            iconName="IconAddress"
            title="67 August Revolution, Ward 11, Tan Binh District"
          ></IconWithText>
        </View>
      </View>
    </View>
  );
};

export default PersonalInf;

const styles = StyleSheet.create({
  infContainer: {
    flexDirection: "column",
    gap: 15,
    padding: 10,
    backgroundColor: "#fff",
    shadowOffset: {
      width: 1,
      height: -1,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 5,
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  updateText: { color: "#518B1A", fontSize: 12 },
  updatebtn: {
    backgroundColor: "rgba(140, 200, 64, 0.2)",
    width: 50,
    height: 30,
    // marginLeft: 25,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
