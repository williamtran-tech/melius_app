import axios from "axios";
import { LogMeal_Key } from "@env";
const MeaLogServer = axios.create({
  baseURL: "https://api.logmeal.es",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${LogMeal_Key}`,
  },
});
export const HandleImageApi = async (data) => {
  try {
    const formData = new FormData();
    formData.append("image", {
      uri: data,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    console.log("formData", formData);
    const response = await MeaLogServer.post(
      "/v2/image/segmentation/complete/v1.0?language=eng",
      formData
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.data);
  }
};
