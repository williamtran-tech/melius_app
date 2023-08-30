import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import NavigatorMenu from "../../components/NavigatorMenu";
import SubText from "../../components/SubText";
import ProjectNutrition from "../../components/ProjectNutrition";
import MenuEdit from "../../components/MenuEdit";
import { getMealPlan } from "../../Services/SuggestMealPlan";
import moment from "moment";

const MenuEditScreen = ({ route }) => {
  const {
    navigation,
    selectedDate,
    setSelectedDate,
    updateFlag,
    setUpdateFlag,
    DateMeal,
  } = route.params;
  console.log("hello", DateMeal);

  const [undoItem, setUndoItem] = useState(null);
  const [mealPlan, setMealPlan] = useState();
  const [menuUpdated, setMenuUpdated] = useState(false);
  const fetchMealPlan = async () => {
    try {
      const mealPlanData = await getMealPlan(DateMeal);

      setMealPlan(mealPlanData);
    } catch (error) {
      console.error("Error fetching meal plan:", error);
    }
  };
  useEffect(() => {
    fetchMealPlan();
    console.log("updated menu");
  }, [updateFlag, menuUpdated]);
  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      {DateMeal && (
        <View style={{ paddingHorizontal: 25 }}>
          <NavigatorMenu
            Date={moment(DateMeal, "YYYY-MM-DD").format("DD-MM-YYYY")}
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
                      updateFlag: updateFlag,
                      DateMeal: DateMeal,
                      setUpdateFlag: setUpdateFlag,
                      menuUpdated: menuUpdated,
                      setMenuUpdated: setMenuUpdated,
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
        {mealPlan && (
          <MenuEdit
            undoItem={undoItem}
            setUndoItem={setUndoItem}
            planDetails={mealPlan.planDetails}
            updateFlag={updateFlag}
            setUpdateFlag={setUpdateFlag}
            menuUpdated={menuUpdated}
            setMenuUpdated={setMenuUpdated}
            DateMeal={DateMeal}
          ></MenuEdit>
        )}
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
