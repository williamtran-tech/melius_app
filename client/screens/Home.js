import { View, Button, TouchableOpacity, Text , Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ApiHandler from '../services/ApiHandler';
import { useState , useEffect} from 'react';
const HomeScreen = () => {
  const navigation = useNavigation();
  const goToNewScreen = () => {
    navigation.navigate('Other', { screen: 'News' });
  };
  const [data, setData] = useState([]);

  const fetchData = () => {
    ApiHandler.axiosServer1
      .get('/api/breeds/image/random')
      .then(response => {
        // Handle response
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Go to New Screen" onPress={goToNewScreen} />
      <View>
        <Image source={{ uri: data.message }} style={{ width: 200, height: 200 }} />
      </View>
    </View>
  );
  
  
  
};
export default HomeScreen;
