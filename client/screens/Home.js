import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import DailyNews from './DailyNews';

const Home = () => {
  const navigation = useNavigation();

  const goToNewScreen = () => {
    navigation.navigate('DailyNews');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Go to New Screen" onPress={goToNewScreen} />
    </View>
  );
};

export default Home;
