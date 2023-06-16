import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SVGicon from "../assets/icon/SVGicon";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingScreen";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  const [selectedTab, setSelectedTab] = useState("Home");
  const navigation = useNavigation();
  const openChatBot = () => {
    navigation.navigate("Chat bot");
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: () => {
          let IconComponent;

          if (route.name === "Home") {
            IconComponent =
              selectedTab === "Home" ? SVGicon.Home : SVGicon.HomeOutline;
          } else if (route.name === "Community") {
            IconComponent =
              selectedTab === "Community"
                ? SVGicon.Community
                : SVGicon.CommunityOutline;
          } else if (route.name === "Menu") {
            IconComponent =
              selectedTab === "Menu" ? SVGicon.Menu : SVGicon.MenuOutline;
          } else if (route.name === "Diary") {
            IconComponent =
              selectedTab === "Diary" ? SVGicon.Diary : SVGicon.DiaryOutline;
          } else if (route.name === "Setting") {
            IconComponent =
              selectedTab === "Setting"
                ? SVGicon.Profile
                : SVGicon.ProfileOutline;
          }

          if (IconComponent) {
            return (
              <TouchableOpacity style={styles.tabBar}>
                <IconComponent />
              </TouchableOpacity>
            );
          } else {
            return null;
          }
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          display: "flex",
          // height: 60,
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 40,
        },
      })}
      initialRouteName="Home" // Set the initial tab as "Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        listeners={{
          focus: () => setSelectedTab("Home"), // Set the selected tab as "Home" when it is focused
        }}
        options={{ tabBarActiveTintColor: "black", tabBarLabel: () => null }} // Set active tint color for the tab
      />
      <Tab.Screen
        name="Community"
        component={SettingsScreen}
        listeners={{
          focus: () => setSelectedTab("Community"), // Set the selected tab as "Setting" when it is focused
        }}
        options={{ tabBarActiveTintColor: "black", tabBarLabel: () => null }} // Set active tint color for the tab
      />
      <Tab.Screen
        name="Menu"
        component={SettingsScreen}
        listeners={{
          focus: () => setSelectedTab("Menu"), // Set the selected tab as "Setting" when it is focused
        }}
        options={{ tabBarActiveTintColor: "black", tabBarLabel: () => null }} // Set active tint color for the tab
      />
      <Tab.Screen
        name="Diary"
        component={SettingsScreen}
        listeners={{
          focus: () => setSelectedTab("Diary"), // Set the selected tab as "Setting" when it is focused
        }}
        options={{ tabBarActiveTintColor: "black", tabBarLabel: () => null }} // Set active tint color for the tab
      />
      <Tab.Screen
        name="Setting"
        component={SettingsScreen}
        listeners={{
          focus: () => setSelectedTab("Setting"), // Set the selected tab as "Setting" when it is focused
        }}
        options={{ tabBarActiveTintColor: "black", tabBarLabel: () => null }} // Set active tint color for the tab
      />
    </Tab.Navigator>
  );
}
export default BottomNavigation;

const styles = StyleSheet.create({
  tabBar: {
    padding: 15,
  },
});
