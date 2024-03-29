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
const MenuNavigation = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [selectedIngredient, setSelectedIngredient] = useState();
  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);
  return (
    <Stack.Navigator initialRouteName="MenuScreen">
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        initialParams={{
          navigation: navigation,
          selectedDate: selectedDate,
          setSelectedDate: setSelectedDate,
        }}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MenuEditScreen"
        component={MenuEditScreen}
        initialParams={{
          navigation: navigation,
          selectedDate: selectedDate,
          setSelectedDate: setSelectedDate,
        }}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewMenuScreen"
        component={NewMenuScreen}
        initialParams={{
          navigation: navigation,
          selectedDate: selectedDate,
          setSelectedDate: setSelectedDate,
        }}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MotherIngredients"
        component={MotherIngredients}
        initialParams={{
          navigation: navigation,
          selectedDate: selectedDate,
          setSelectedDate: setSelectedDate,
        }}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ARScan"
        component={ARScan}
        initialParams={{
          navigation: navigation,
          selectedDate: selectedDate,
          setSelectedDate: setSelectedDate,
        }}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MenuDetail"
        component={MenuDetail}
        initialParams={{
          navigation: navigation,
          selectedDate: selectedDate,
          setSelectedDate: setSelectedDate,
        }}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MenuNavigation;

const styles = StyleSheet.create({});
