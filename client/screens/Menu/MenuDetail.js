import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import NavigatorMenu from "../../components/NavigatorMenu";
import { imageSearchEngine } from "../../Services/FoodSearching";
import HeaderText from "../../components/HeaderText";
import MealTime from "../../components/MealTime";
import IngredientList from "../../components/IngredientList";
import { ScrollView } from "react-native-gesture-handler";
import InstructionCook from "../../components/InstructionCook";
import { useNavigation } from "@react-navigation/native";

const MenuDetail = ({ route }) => {
  const { selectedDate, setSelectedDate, data } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  const [foodUrl, setFoodUrl] = useState();
  console.log("cc:", data);
  const searchEngine = async (name) => {
    const url = await imageSearchEngine(name);
    setFoodUrl(url);
    setIsLoading(false);
  };
  useEffect(() => {
    if (data && data.name) {
      searchEngine(data.name);
    }
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      {selectedDate && (
        <View style={{ paddingHorizontal: 25 }}>
          <NavigatorMenu
            Date={selectedDate}
            ScreenName={data.name}
            navigationName="MenuScreen"
            // navigation={navigation.goBack()}
            // action={
            //   <View style={styles.container}>
            //     <TouchableOpacity style={styles.btnAction}>
            //       <SubText style={{ fontSize: 14, color: "#518B1A" }}>
            //         Save
            //       </SubText>
            //     </TouchableOpacity>
            //     <TouchableOpacity
            //       style={styles.btnActionCancel}
            //       onPress={() => navigation.navigate("NewMenuScreen")}
            //     >
            //       <SubText style={{ fontSize: 14, color: "#FF9600" }}>
            //         Cancel
            //       </SubText>
            //     </TouchableOpacity>
            //   </View>
            // }
          ></NavigatorMenu>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator
                  size="large"
                  color="#518B1A"
                  style={styles.loader}
                />
              </View>
            ) : (
              <Image
                source={{ uri: foodUrl }}
                style={{ flex: 1, resizeMode: "cover", aspectRatio: 16 / 9 }}
              ></Image>
            )}
          </View>
          <View style={{ padding: 25 }}>
            <HeaderText style={{ color: "#518B1A", fontSize: 18 }}>
              Ingredients
            </HeaderText>
          </View>

          <View style={{ flex: 3 }}>
            <IngredientList data={data}></IngredientList>
          </View>
          <View style={{ padding: 25 }}>
            <HeaderText style={{ color: "#518B1A", fontSize: 18 }}>
              Ingredients
            </HeaderText>
          </View>
          <View style={{ flex: 3 }}>
            <InstructionCook data={data}></InstructionCook>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MenuDetail;

const styles = StyleSheet.create({
  btnAction: {
    height: 30,
    backgroundColor: "rgba(140, 200, 64, 0.20)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  btnActionCancel: {
    height: 30,
    backgroundColor: "rgba(255, 150, 0, 0.20)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
