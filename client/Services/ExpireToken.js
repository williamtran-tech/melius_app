import AsyncStorage from "@react-native-async-storage/async-storage";

import jwtDecode from "jwt-decode";
import moment from "moment";

export const HandleExpireToken = async () => {
  try {
    const value = await AsyncStorage.getItem("Authentication");
    if (value) {
      const expirationTime = moment.unix(jwtDecode(value).exp);
      const isTokenExpired = expirationTime.isBefore(moment());
      return isTokenExpired;
    }
    return false;
  } catch (error) {
    console.error("Error fetching authentication token:", error);
    return true; // If an error occurs, consider the token as expired
  }
};
// export const getToken = () => {
//   const Token = AsyncStorage.getItem("Authentication").then((value) => {
//     return value;
//   });
// };
