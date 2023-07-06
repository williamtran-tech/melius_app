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
const MenuNavigation = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD-MM-YYYY")
  );
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
        initialParams={{ navigation, selectedDate, setSelectedDate }}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewMenuScreen"
        component={NewMenuScreen}
        initialParams={{ navigation, selectedDate, setSelectedDate }}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default MenuNavigation;

const styles = StyleSheet.create({});
