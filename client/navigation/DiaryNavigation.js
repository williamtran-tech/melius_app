// import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import MenuScreen from "../screens/Menu/MenuScreen";
import MenuEditScreen from "../screens/Menu/MenuEditScreen";
import { useNavigation } from "@react-navigation/native";
import HeaderText from "../components/HeaderText";
import NewMenuScreen from "../screens/Menu/NewMenuScreen";
import moment from "moment";
import MotherIngredients from "../screens/Menu/MotherIngredients";
import ARScan from "../screens/Menu/ARScan";
import MenuDetail from "../screens/Menu/MenuDetail";
import DiaryHome from "../screens/Diary/DiaryHome";
const DiaryNavigation = () => {
  const navigation = useNavigation();
  //   const [selectedDate, setSelectedDate] = useState(
  //     moment().format("YYYY-MM-DD")
  //   );
  //   const [selectedIngredient, setSelectedIngredient] = useState();
  //   useEffect(() => {
  //     console.log(selectedDate);
  //   }, [selectedDate]);
  return (
    <Stack.Navigator initialRouteName="DiaryHome">
      <Stack.Screen
        name="DiaryHome"
        component={DiaryHome}
        // initialParams={{
        //   navigation: navigation,
        //   selectedDate: selectedDate,
        //   setSelectedDate: setSelectedDate,
        // }}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default DiaryNavigation;

const styles = StyleSheet.create({});
