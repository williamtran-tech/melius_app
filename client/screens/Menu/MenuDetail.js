import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import NavigatorMenu from "../../components/NavigatorMenu";
import { imageSearchEngine } from "../../Services/FoodSearching";
import HeaderText from "../../components/HeaderText";

const MenuDetail = ({ route }) => {
  const { navigation, selectedDate, setSelectedDate, data } = route.params;
  const [foodUrl, setFoodUrl] = useState();
  //   console.log("cc:", data);
  const searchEngine = async (name) => {
    const url = await imageSearchEngine(name);
    setFoodUrl(url);
  };
  useEffect(() => {
    searchEngine(data);
  }, [foodUrl]);
  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      {selectedDate && (
        <View style={{ paddingHorizontal: 25 }}>
          <NavigatorMenu
            Date={selectedDate}
            ScreenName={data}
            navigationName="MenuScreen"
            navigation={navigation}
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
          <View style={{ flex: 1, backgroundColor: "#000" }}>
            <HeaderText>bbb</HeaderText>
          </View>
        </View>
      )}
      <View style={{ flex: 1, padding: 25 }}>
        <Image
          source={{ uri: foodUrl ? foodUrl : null }}
          style={{ flex: 1, resizeMode: "cover" }}
        ></Image>
      </View>
      <View style={{ flex: 3 }}>
        <View style={{ paddingHorizontal: 25, marginVertical: 15 }}>
          {/* <MealTime></MealTime> */}
        </View>
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
