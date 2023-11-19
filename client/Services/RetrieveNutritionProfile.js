import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
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
export const updateChildProfile = async (values) => {
  try {
    const value = await AsyncStorage.getItem("userProfile");

    const userProfile = JSON.parse(value);

    // setKidId(userProfile.kidProfile[0].id);
    console.log({
      kidId: userProfile.kidProfile[0].id,
      dob: moment(values.dob).format("YYYY-MM-DD"),
      fullName: values.fullName,
      gender: values.gender,
    });
    const response = await HandleApi.serverGeneral.patch(
      "/v1/users/profile/kid",
      {
        kidId: userProfile.kidProfile[0].id,
        dob: moment(values.dob).format("YYYY-MM-DD"),
        fullName: values.fullName,
        gender: values.gender == "male" ? 1 : 0,
      }
    );

    await getUserProfile();
  } catch (error) {
    console.error(error);
  }
};
