import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import NavigatorMenu from "../../components/NavigatorMenu";
import SubText from "../../components/SubText";
import ProjectNutrition from "../../components/ProjectNutrition";
import MenuEdit from "../../components/MenuEdit";

const MenuEditScreen = ({ navigation, route }) => {
  const { selectedDate, setSelectedDate } = route.params;
  console.log(selectedDate);
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
                <TouchableOpacity style={styles.btnAction}>
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
        <MenuEdit></MenuEdit>
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
