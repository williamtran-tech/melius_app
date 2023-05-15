import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const DailyNews = () => {
  const navigation = useNavigation();

  const handleBackButton = () => {
    // Implement custom back button behavior here
    // ...
    // Then navigate back
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleBackButton} style={{ marginLeft: 10 }}>
          <Icon name="arrow-back-outline" size={30} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleBackButton]);

  return (
    <View>
      <Text>DailyNews</Text>
    </View>
  );
};

export default DailyNews;
