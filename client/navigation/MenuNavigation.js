// import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import MenuScreen from "../screens/Menu/MenuScreen";
import MenuEditScreen from "../screens/Menu/MenuEditScreen";
import { useNavigation } from "@react-navigation/native";
import HeaderText from "../components/HeaderText";
const MenuNavigation = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="MenuScreen">
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{ headerShown: false, navigation }}
      />
      <Stack.Screen
        name="MenuEditScreen"
        component={MenuEditScreen}
        options={{
          headerShown: false,
          navigation,
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
