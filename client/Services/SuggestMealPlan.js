import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import HandleApi from "./HandleApi";
import axios from "axios";

export const getUserInfor = async () => {
  const value = await AsyncStorage.getItem("userProfile");
  console.log("mealPlan", JSON.parse(value));
};
export const suggestMealPlan = async (date) => {
  const dateTime = date ? date : moment().format("YYYY-MM-DD");

  try {
    console.log("dateTime:", date);
    const value = await AsyncStorage.getItem("userProfile");
    console.log("mealPlan", JSON.parse(value));
    const kidId = JSON.parse(value)?.kidProfile[0].id;
    console.log("kidId", JSON.parse(value)?.kidProfile[0].id);
    if (kidId) {
      //handle api get mealplan
      const response = await HandleApi.serverGeneral.post(
        "v1/users/suggested-meal-plan",
        {
          kidId: kidId,
          nMeal: 3,
          duration: 1,
          date: dateTime,
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
export const getMealPlan = async (date) => {
  const dateTime = date ? date : moment().format("YYYY-MM-DD").toString();
  console.log("getMealPlan dateTime:", dateTime);
  try {
    const value = await AsyncStorage.getItem("userProfile");
    // console.log(JSON.parse(value)?.mealPlan);
    const kidId = JSON.parse(value)?.kidProfile[0].id;
    // console.log(kidId);
    const response = await HandleApi.serverGeneral.get(`v1/users/meal-plan`, {
      params: {
        kidId: kidId,
        date: dateTime,
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
export const SuggestMealPlanByDate = async (date) => {
  const dateTime = date ? date : moment().format("YYYY-MM-DD");
  console.log(dateTime);
  try {
    const MealPlanByDate = await createMealPlanByDate(dateTime);
    console.log("status:", MealPlanByDate);
    if (MealPlanByDate === 400) {
      console.log("400");
      const MealPlan = await getMealPlan(dateTime);
      return MealPlan;
    } else {
      const mealPlanData = await suggestMealPlan(dateTime);
      const MealPlan = await getMealPlan(dateTime);
      return MealPlan;
      // console.log("200");
    }
    // if (!mealPlanDate.isSame(moment(), "day") || !mealPlanDate || !value) {
    //   const mealPlanData = await suggestMealPlan();
    //   const MealPlan = await getMealPlan();
    //   return MealPlan;
    // } else {
    //   const mealPlanData = JSON.parse(value);
    //   const MealPlan = await getMealPlan();
    //   // console.log(MealPlan);
    //   return MealPlan;
    // }
  } catch (error) {
    console.error("Error fetching meal plan:", error);
  }
};
export const RefreshMealPlanByDate = async (date) => {
  const dateTime = date ? date : moment().format("YYYY-MM-DD");
  console.log(dateTime);
  try {
    const mealPlanData = await suggestMealPlan(dateTime);
    const MealPlan = await getMealPlan(dateTime);
    return MealPlan;
  } catch (error) {
    console.error("Error fetching meal plan:", error);
  }
};
export const patchUpdateMealPlan = async (id, mealTime, recipeId) => {
  const value = await AsyncStorage.getItem("userProfile");
  // console.log(JSON.parse(value)?.mealPlan);
  const kidId = JSON.parse(value)?.kidProfile[0].id;

  const dataToUpdate = {
    id: id,
    kidId: kidId,
    mealTime: mealTime,
    recipeId: recipeId,
  };
  console.log("dataToUpdate", dataToUpdate);
  const params = {
    id: id,
    kidId: kidId,
    mealTime: mealTime,
    recipeId: recipeId,
  };
  console.log("params:", params);

  try {
    const response = await HandleApi.serverGeneral.patch(
      `v1/users/meal-plan/meal-detail?id=${params.id}&kidId=${params.kidId}&mealTime=${params.mealTime}&recipeId=${params.recipeId}`
    );
    console.log("PATCH request successful:", response.data);
    // You can handle the response data here
  } catch (error) {
    console.error("Error making PATCH request:", error);
    // You can handle the error here
  }
};
export const deleteMeal = async (id) => {
  const value = await AsyncStorage.getItem("userProfile");
  const kidId = JSON.parse(value)?.kidProfile[0].id;
  console.log(kidId);
  console.log(id);

  try {
    const response = await HandleApi.serverGeneral.delete(
      `/v1/users/meal-plan/detail?id=${id}&kidId=${kidId}`
    );
    console.log("Delete request successful:", response.data);
  } catch (error) {
    console.error("Error making delete request:", error);
    // You can handle the error here
  }
};
export const undoMeal = async (id) => {
  const value = await AsyncStorage.getItem("userProfile");
  const kidId = JSON.parse(value)?.kidProfile[0].id;
  console.log(kidId);
  console.log(id);

  try {
    const response = await HandleApi.serverGeneral.patch(
      `/v1/users/meal-plan/detail?id=${id}&kidId=${kidId}`
    );
    console.log("Undo Delete request successful:", response.data);
  } catch (error) {
    console.error("Error making delete request:", error);
    // You can handle the error here
  }
};
export const addNewMealPlan = async (mealTime, recipeId, type) => {
  const value = await AsyncStorage.getItem("userProfile");
  const kidId = JSON.parse(value)?.kidProfile[0].id;

  const params = {
    kidId: kidId,
    mealTime: mealTime,
    recipeId: recipeId,
    type: "Main course",
  };
  console.log("New meal params:", params);

  try {
    const response = await HandleApi.serverGeneral.post(
      `/v1/users/meal-plan/detail`,
      params
    );
    console.log("Add new meal successful:", response.data);
    // You can handle the response data here
  } catch (error) {
    console.error("Error making new meal request:", error);
    console.error("Error response data:", error.response?.data);
    // You can handle the error here
  }
};
export const createMealPlan = async (kidId) => {
  try {
    const mealPlanResponse = await HandleApi.serverGeneral.post(
      "v1/users/meal-plan",
      {
        kidId: kidId,
      }
    );
  } catch (error) {
    console.error(error);
    // setLoading(false);
  }
};
export const createMealPlanByDate = async (date) => {
  const dateTime = date ? date : moment().format("YYYY-MM-DD").toString();
  console.log("createMealPlanByDate:", dateTime);
  try {
    const value = await AsyncStorage.getItem("userProfile");
    console.log("userProfileeeeeeeeee", JSON.parse(value)?.mealPlan);
    const kidId = JSON.parse(value)?.kidProfile[0].id;
    const mealPlanResponse = await HandleApi.serverGeneral.post(
      "v1/users/meal-plan",
      {
        kidId: kidId,
        nMeal: 3,
        date: dateTime,
      }
    );
    return mealPlanResponse.status;
  } catch (error) {
    if (error.response) {
      // console.error("API Error Response", error.response.status);
      // console.error("API Error Data:", error.response.data);
      return error.response.status;
    }
  }
};
