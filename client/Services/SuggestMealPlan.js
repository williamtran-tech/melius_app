import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import HandleApi from "./HandleApi";

export const suggestMealPlan = async () => {
  try {
    const value = await AsyncStorage.getItem("mealPlan");
    const kidId = JSON.parse(value)?.mealPlan[0]?.kidId;
    if (kidId) {
      const response = await HandleApi.serverGeneral.post(
        "v1/users/suggested-meal-plan",
        {
          kidId,
          nMeal: 3,
          duration: 1,
        }
      );
      AsyncStorage.setItem(
        "sugsestMealPlan",
        JSON.stringify(response.data)
      ).then(() => {
        console.log("store suggest meal successfully");
      });
      console.log(response.data.nutrientsTarget.updatedAt);
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching meal plan:", error);
  }
};
export const updateMealPlan = async () => {
  try {
    const value = await AsyncStorage.getItem("sugsestMealPlan");
    const duration = moment.duration(
      moment().diff(JSON.parse(value).nutrientsTarget.updatedAt)
    );
    const hoursRange = duration.asHours();
    console.log(hoursRange);
    if (hoursRange > 24) {
      const mealPlanData = await suggestMealPlan();
      console.log("New Meal Plan:", mealPlanData);
      return mealPlanData;
    } else {
      const mealPlanData = JSON.parse(value);
      //   console.log("Cached Meal Plan:", mealPlanData);
      return mealPlanData;
    }
  } catch (error) {
    console.error("Error fetching meal plan:", error);
  }
};
