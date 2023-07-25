import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Loader from "./Loader";
import SubText from "./SubText";
const HealthIndex = () => {
  const [healthRecord, setHealthRecord] = useState();
  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem("userProfile");
      const userProfile = JSON.parse(value);
      console.log("userProfileeeeee:", userProfile);
      // Check if the required data is available before setting the state
      setHealthRecord(userProfile.kidProfile[0].healthRecord[0]);
    } catch (error) {
      console.error("Error fetching userProfile from AsyncStorage:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.inforItemContainer}>
      <SubText style={styles.lastupdatetext}>Last updated 15/04/2023</SubText>
      <View style={styles.informationContainer}>
        <View style={styles.inforItem}>
          <View style={{ flexDirection: "column", marginTop: "auto" }}>
            <SubText style={styles.inforItemText}>
              {healthRecord && healthRecord.weight}kg
            </SubText>
            <SubText style={styles.nameItemText}>Weight</SubText>
          </View>
          <View style={{ flexDirection: "column", marginTop: "auto" }}>
            <SubText style={styles.inforItemText}>
              {healthRecord && healthRecord.height}cm
            </SubText>
            <SubText style={styles.nameItemText}>Height</SubText>
          </View>
          <View style={{ flexDirection: "column", marginTop: "auto" }}>
            <SubText style={styles.BMIItemText}>
              {healthRecord && healthRecord.bmi.toFixed()}
            </SubText>
            <SubText style={styles.nameItemText}>BMI</SubText>
          </View>
        </View>

        <TouchableOpacity style={styles.updatebtn}>
          <SubText style={styles.updateText}>Update</SubText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HealthIndex;

const styles = StyleSheet.create({
  inforItemContainer: {
    flex: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    boxShadow: "inset 0px 0px 4px rgba(26, 26, 26, 0.2)",
    // marginLeft: 13,
    // marginRight: 13,
    marginTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 17,
    borderRadius: 5,
    elevation: 4, // Specifies the elevation for the drop shadow
    shadowColor: "#1A1A1A", // Color of the shadow
    shadowOffset: { width: 0, height: -1 }, // Offset of the shadow (0px horizontally, -1px vertically)
    shadowOpacity: 0.2, // Opacity of the shadow
    shadowRadius: 4, // Radius of the shadow blur
    shadowSpread: -4,
    paddingTop: 10,
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
    marginTop: "auto",
  },
  informationContainer: {
    marginTop: 5,
    flexDirection: "row",
    // alignItems: "center",
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
});
