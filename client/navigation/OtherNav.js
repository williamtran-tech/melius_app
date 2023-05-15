import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import DailyNews from '../screens/DailyNews';
const Stack = createStackNavigator();
const OtherNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="News" component={DailyNews} />
      <Stack.Screen name="Notifications" component={DailyNews} />
    </Stack.Navigator>
  )
}
export default OtherNav