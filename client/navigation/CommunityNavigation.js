// import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import HeaderText from "../components/HeaderText";
import ComHome from "../screens/Community/ComHome";

const CommunityNavigation = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="MenuScreen">
      <Stack.Screen
        name="MenuScreen"
        component={ComHome}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
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
      /> */}
    </Stack.Navigator>
  );
};

export default CommunityNavigation;

const styles = StyleSheet.create({});
