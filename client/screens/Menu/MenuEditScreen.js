import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import NavigatorMenu from "../../components/NavigatorMenu";
import SubText from "../../components/SubText";
import ProjectNutrition from "../../components/ProjectNutrition";
import MenuEdit from "../../components/MenuEdit";

const MenuEditScreen = ({ route }) => {
  const { navigation, selectedDate, setSelectedDate, suggestedNutrition } =
    route.params;
  console.log("hello", suggestedNutrition);

  const [data, setData] = useState([
    {
      id: 1,
      food: "country french potato soup",
      time: "2023-08-03T07:00:00.000Z",
    },
    {
      id: 2,
      food: "Noodles with tomato sauce with bruised meat",
      time: "2023-07-30T08:00:00.000Z",
    },
    {
      id: 3,
      food: "creamy chicrken black bean tacos",
      time: "2023-07-30T13:00:00.000Z",
    },
    {
      id: 4,
      food: "quick peach cobbler",
      time: "2023-07-30T14:00:00.000Z",
    },
    {
      id: 5,
      food: "country french potato soup",
      time: "2023-07-30T19:00:00.000Z",
    },
    {
      id: 6,
      food: "Noodles with tomato sauce with bruised meat",
      time: "2023-07-30T20:00:00.000Z",
    },
  ]);
  const [undoItem, setUndoItem] = useState(null);
  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      {selectedDate && (
        <View style={{ paddingHorizontal: 25 }}>
          <NavigatorMenu
            Date={selectedDate}
            ScreenName="Edit"
            navigationName="MenuScreen"
            navigation={navigation}
            action={
              <View style={styles.container}>
                <TouchableOpacity style={styles.btnAction}>
                  <SubText style={{ fontSize: 14, color: "#518B1A" }}>
                    Select
                  </SubText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnAction}
                  onPress={() =>
                    navigation.navigate("NewMenuScreen", {
                      listFood: data,
                      setData: setData,
                    })
                  }
                >
                  <SubText
                    style={{
                      fontSize: 25,
                      fontWeight: "bold",
                      color: "#518B1A",
                    }}
                  >
                    +
                  </SubText>
                </TouchableOpacity>
              </View>
            }
          ></NavigatorMenu>
          <View style={{ marginVertical: 20 }}>
            <ProjectNutrition></ProjectNutrition>
          </View>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <MenuEdit
          data={data}
          setData={setData}
          undoItem={undoItem}
          setUndoItem={setUndoItem}
          suggestedNutrition={suggestedNutrition.sessionNutrition}
        ></MenuEdit>
      </View>
    </View>
  );
};

export default MenuEditScreen;

const styles = StyleSheet.create({
  btnAction: {
    height: 30,
    backgroundColor: "rgba(140, 200, 64, 0.20)",
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
