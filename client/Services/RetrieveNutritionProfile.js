import AsyncStorage from "@react-native-async-storage/async-storage";
import HandleApi from "./HandleApi";

export const getUserProfile = async () => {
  try {
    const response = await HandleApi.serverGeneral.get("/v1/users/profile");
    await AsyncStorage.setItem("userProfile", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
