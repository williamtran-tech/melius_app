import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaViewBase, StyleSheet, Text, View } from 'react-native';
import BottomNavigation from './navigation/BottomNavigation';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
