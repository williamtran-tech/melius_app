import HandleApi from "./HandleApi";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

export const getPost = async (topic) => {
  try {
    const response = await HandleApi.serverGeneral.get("v1/community/posts", {
      params: {
        topic: topic,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null; // Return null or handle the error as needed
  }
};
export const createPost = async (
  content,
  isAnonymous,
  topicId,
  tags,
  photos
) => {
  try {
    const formData = new FormData();
    formData.append("content", "ddddd");
    formData.append("isAnonymous", isAnonymous);
    formData.append("topicId", topicId);
    tags && formData.append("tags", tags.join(","));

    for (const photo of photos) {
      const assetInfo = await MediaLibrary.getAssetInfoAsync(photo);
      const localUri = assetInfo.localUri;
      const fileName = `photo_${Date.now()}.jpg`; // You can customize the file name

      // Append the image to the FormData object with a custom name
      formData.append("photos", {
        uri: localUri,
        name: fileName,
        type: "image/jpeg", // You can adjust the MIME type based on your needs
      });
    }
    console.log(formData);
    const response = await HandleApi.serverGeneral.post(
      "v1/community/posts",
      formData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null; // Return null or handle the error as needed
  }
};
