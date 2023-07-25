import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import HandleApi from "./HandleApi";

export const suggestMealPlan = async () => {
  try {
    const value = await AsyncStorage.getItem("mealPlan");
    const kidId = JSON.parse(value)?.mealPlan.kidId;
    // console.log("OK", JSON.parse(value)?.mealPlan);
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
      //   console.log(response.data.nutrientsTarget.updatedAt);
      //   console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching meal plan:", error);
  }
};
export const updateMealPlan = async () => {
  try {
    const value = await AsyncStorage.getItem("sugsestMealPlan");
    const mealPlanDate = moment(JSON.parse(value).nutrientsTarget.updatedAt);
    const updatedMealPlanDate = mealPlanDate.add(7, "hours");
    console.log(JSON.parse(value).nutrientsTarget);
    console.log("mealPlanDate1:", mealPlanDate.format("DD-MM-YYYY, HH:mm:ss"));
    console.log(
      "kid",
      moment("2023-07-25T11:09:51.040Z").format("DD-MM-YYYY HH:mm:ss")
    );
    console.log(
      "mealPlan",
      moment("2023-07-24T16:44:06.000Z").format("DD-MM-YYYY HH:mm:ss")
    );
    const currentDate = moment().startOf("day");
    if (!mealPlanDate.isSame(currentDate, "day")) {
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
