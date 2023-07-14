import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ListDoctor from "../../components/ListDoctor";

const DoctorScreen = () => {
  return (
    <View>
      <ListDoctor row={false}></ListDoctor>
    </View>
  );
};

export default DoctorScreen;

const styles = StyleSheet.create({});
