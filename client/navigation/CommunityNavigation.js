// import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import HeaderText from "../components/HeaderText";
import ComChat247 from "../screens/Community/ComChat247";
import ComHome from "../screens/Community/ComHome";
import HospitalScreen from "../screens/Community/HospitalScreen";
import DoctorScreen from "../screens/Community/DoctorScreen";

const CommunityNavigation = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={ComHome}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat247"
        component={ComChat247}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Hospital"
        component={HospitalScreen}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Doctor"
        component={DoctorScreen}
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
