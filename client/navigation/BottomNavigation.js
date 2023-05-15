import React, { useState } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import ChatBot from '../screens/ChatBot';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const [selectedTab, setSelectedTab] = useState('Screen1');

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
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
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Status" component={Home} />
        <Tab.Screen name="Chat bot" component={ChatBot} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default BottomNavigation