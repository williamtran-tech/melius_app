import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ListHospital from "../../components/ListHostpital";

const HospitalScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ListHospital row={false}></ListHospital>
    </View>
  );
};

export default HospitalScreen;

const styles = StyleSheet.create({});
