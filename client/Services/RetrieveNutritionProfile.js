import AsyncStorage from "@react-native-async-storage/async-storage";
import HandleApi from "./HandleApi";

export const getUserProfile = async () => {
  try {
    const response = await HandleApi.serverGeneral.get("/v1/users/profile");
    console.log(response.data);
    const save = await AsyncStorage.setItem(
      "userProfile",
      JSON.stringify(response.data)
    );
    const res = await AsyncStorage.getItem("userProfile");
    console.log("ASHAKHD", JSON.parse(res));
    return JSON.parse(res);
  } catch (error) {
    console.error(error);
  }
};
export const getChildHistory = async (id) => {
  try {
    const response = await HandleApi.serverGeneral.get("/v1/diary/kid", {
      params: {
        kidId: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
