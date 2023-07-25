import AsyncStorage from "@react-native-async-storage/async-storage";
import HandleApi from "./HandleApi";

export const getUserProfile = () => {
  HandleApi.serverGeneral
    .get("/v1/users/profile")
    .then((response) => {
      console.log("cc");
      AsyncStorage.setItem("userProfile", JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error(error.data);
    });
};
