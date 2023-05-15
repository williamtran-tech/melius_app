import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatBot from '../screens/ChatBot';

import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/Home';
import { useNavigation } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const [selectedTab, setSelectedTab] = useState('Screen1');
  const navigation = useNavigation();
  const openChatBot = () => {
    navigation.navigate('Chat bot');
  };
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={openChatBot}>
                  <Icon name="ios-chatbubble-outline" size={24} />
                </TouchableOpacity>
              ),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Chat bot') {
              iconName = focused ? 'ios-chatbubble' : 'ios-chatbubble-outline';
            } else if (route.name === 'Status') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            display: 'flex',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Status" component={HomeScreen} />
        <Tab.Screen name="Chat bot" component={ChatBot} />
      </Tab.Navigator>
  );
};
export default BottomNavigation