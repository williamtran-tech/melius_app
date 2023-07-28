import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import HandleApi from "./HandleApi";

export const suggestMealPlan = async () => {
  try {
    const value = await AsyncStorage.getItem("userProfile");
    console.log(JSON.parse(value)?.mealPlan);
    const kidId = JSON.parse(value)?.kidProfile[0].id;
    console.log("OK", JSON.parse(value)?.kidProfile[0].id);
    if (kidId) {
      const response = await HandleApi.serverGeneral.post(
        "v1/users/suggested-meal-plan",
        {
          kidId,
          nMeal: 3,
          duration: 1,
        }
      );
      const data = {
        ...response.data,
        timeStamp: moment(),
      };
      AsyncStorage.setItem("sugsestMealPlan", JSON.stringify(data)).then(() => {
        console.log("store suggest meal successfully");
      });
      //   console.log(response.data.nutrientsTarget.updatedAt);

      return response.data;
    }
  } catch (error) {
    console.error("Error fetching meal plan:", error);
  }
};
export const updateMealPlan = async () => {
  try {
    const value = await AsyncStorage.getItem("sugsestMealPlan");
    const mealPlanDate = moment(JSON.parse(value)?.timeStamp);

    if (!mealPlanDate.isSame(moment(), "day") || !mealPlanDate || !value) {
      const mealPlanData = await suggestMealPlan();
      //   console.log("New Meal Plan:", mealPlanData);
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
