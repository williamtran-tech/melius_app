import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import NavigatorMenu from "../../components/NavigatorMenu";
import SubText from "../../components/SubText";
import MealTime from "../../components/MealTime";

const NewMenuScreen = ({ route }) => {
  const { navigation, selectedDate, setSelectedDate, listFood, setData } =
    route.params;
  console.log("ccccc", listFood);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleNewFood = () => {
    const newFood = {
      id: 10,
      food: "Shitttttttttttt",
      time: selectedTime,
    };
    setData((prevData) => [...prevData, newFood]);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      {selectedDate && (
        <View style={{ paddingHorizontal: 25 }}>
          <NavigatorMenu
            Date={selectedDate}
            ScreenName="Add"
            navigationName="MenuScreen"
            navigation={navigation}
            action={
              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.btnAction}
                  onPress={() => {
                    handleNewFood(), navigation.navigate("MenuEditScreen");
                  }}
                >
                  <SubText style={{ fontSize: 14, color: "#518B1A" }}>
                    Save
                  </SubText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnActionCancel}
                  onPress={() => navigation.navigate("NewMenuScreen")}
                >
                  <SubText style={{ fontSize: 14, color: "#FF9600" }}>
                    Cancel
                  </SubText>
                </TouchableOpacity>
              </View>
            }
          ></NavigatorMenu>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 25, marginVertical: 15 }}>
          <MealTime
            setData={setData}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          ></MealTime>
        </View>
      </View>
    </View>
  );
};

export default NewMenuScreen;

const styles = StyleSheet.create({
  btnAction: {
    height: 30,
    backgroundColor: "rgba(140, 200, 64, 0.20)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  btnActionCancel: {
    height: 30,
    backgroundColor: "rgba(255, 150, 0, 0.20)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
