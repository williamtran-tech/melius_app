import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import HandleApi from "./HandleApi";
import axios from "axios";

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
export const getMealPlan = async () => {
  try {
    const value = await AsyncStorage.getItem("userProfile");
    // console.log(JSON.parse(value)?.mealPlan);
    const kidId = JSON.parse(value)?.kidProfile[0].id;
    // console.log(kidId);
    const response = await HandleApi.serverGeneral.get(`v1/users/meal-plan`, {
      params: {
        kidId: kidId,
      },
    });
    return response.data;
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
      const MealPlan = await getMealPlan();
      return MealPlan;
    } else {
      const mealPlanData = JSON.parse(value);
      const MealPlan = await getMealPlan();
      // console.log(MealPlan);
      return MealPlan;
    }
  } catch (error) {
    console.error("Error fetching meal plan:", error);
  }
};
export const patchUpdateMealPlan = async (id, mealTime) => {
  const value = await AsyncStorage.getItem("userProfile");
  // console.log(JSON.parse(value)?.mealPlan);
  const kidId = JSON.parse(value)?.kidProfile[0].id;

  const dataToUpdate = {
    id: id,
    kidId: kidId,
    mealTime: mealTime,
  };

  const params = {
    id: id,
    kidId: kidId,
    mealTime: mealTime.format("YYYY-MM-DD HH:mm:ss"),
  };
  console.log(params);

  try {
    const response = await HandleApi.serverGeneral.patch(
      `v1/users/meal-plan/meal-detail?id=${params.id}&kidId=${params.kidId}&mealTime=${params.mealTime}`
    );
    console.log("PATCH request successful:", response.data);
    // You can handle the response data here
  } catch (error) {
    console.error("Error making PATCH request:", error);
    // You can handle the error here
  }
};
