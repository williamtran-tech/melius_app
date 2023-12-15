import HandleApi from "./HandleApi";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

export const getPost = async (id) => {
  try {
    const response = await HandleApi.serverGeneral.get(
      "v1/community/topics/topic-details",
      {
        params: {
          id: id,
        },
      }
    );
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
    formData.append("content", content);
    formData.append("isAnonymous", isAnonymous);
    formData.append("topicId", topicId);
    if (tags) {
      formData.append("tags", tags.join(","));
      console.log(tags);
    }
    if (photos)
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
      "/v1/community/posts",
      formData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null; // Return null or handle the error as needed
  }
};
export const updatePost = async (
  id,
  content,
  isAnonymous,
  topicId,
  tags,
  photos,
  original
) => {
  try {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("isAnonymous", isAnonymous);
    formData.append("topicId", topicId);
    tags && formData.append("tags", tags.join(","));
    // console.log("photos", photos);
    // console.log("original", original);
    // const isSubset = original.every((originalItem) =>
    //   photos.some(
    //     (photoItem) =>
    //       JSON.stringify(originalItem) === JSON.stringify(photoItem)
    //   )
    // );

    // console.log("result", isSubset);
    if (JSON.stringify(photos) !== JSON.stringify(original)) {
      for (const photo of photos) {
        if (!photo?.isOriginal) {
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
      }
    }

    console.log(formData);
    const response = await HandleApi.serverFormData.post(
      `/v1/community/posts/${id}`,
      formData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null; // Return null or handle the error as needed
  }
};

export const deleteImage = async (postId, imageList) => {
  try {
    const response = await HandleApi.serverGeneral.delete(
      `/v1/community/posts/${postId}`,
      {
        params: { imageIds: imageList.join(",") },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null; // Return null or handle the error as needed
  }
};
export const GetPostDetail = async (postId) => {
  try {
    const response = await HandleApi.serverGeneral.get(
      `/v1/community/posts/${postId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null; // Return null or handle the error as needed
  }
};
export const DeletePost = async (postId) => {
  try {
    console.log(postId);
    const response = await HandleApi.serverGeneral.delete(
      "/v1/community/posts",
      {
        params: {
          id: postId,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null; // Return null or handle the error as needed
  }
};
export const UndoDeletePost = async (postId) => {
  try {
    console.log(postId);
    const response = await HandleApi.serverGeneral.patch(
      `/v1/community/posts?id=${postId}`
    );
    console.log("postId:", postId, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null; // Return null or handle the error as needed
  }
};
export const CommentPost = async (postId, content, activeComment) => {
  try {
    const data = {
      postId: postId,
      comment: content,
      isAnonymous: false,
      ...(activeComment ? { parentId: activeComment } : {}),
    };
    const response = await HandleApi.serverGeneral.post(
      `/v1/community/posts/post-details/comments`,
      data
    );
    console.log("postId:", postId, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null; // Return null or handle the error as needed
  }
};
export const ReactPost = async (postId) => {
  console.log(postId);
  try {
    const response = await HandleApi.serverGeneral.patch(
      `/v1/community/posts/${postId}?react=1`
    );
    console.log("postId:", postId, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null; // Return null or handle the error as needed
  }
};
export const updateComment = async (commentId, content) => {
  try {
    const response = await HandleApi.serverGeneral.patch(
      `/v1/community/posts/post-details/comments?id=${commentId}&comment=${content}&isAnonymous=false`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null; // Return null or handle the error as needed
  }
};
export const deleteComment = async (commentId) => {
  try {
    console.log(`/v1/community/posts/post-details/comments?id=${commentId}`);
    const response = await HandleApi.serverGeneral.delete(
      `/v1/community/posts/post-details/comments?id=${commentId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null; // Return null or handle the error as needed
  }
};
export const getAllPost = async () => {
  try {
    const response = await HandleApi.serverGeneral.get(`/v1/community/posts`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null; // Return null or handle the error as needed
  }
};
export const getAllPostByTag = async (id) => {
  try {
    const response = await HandleApi.serverGeneral.get(
      `/v1/community/tags/tag-details?id=${id}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null; // Return null or handle the error as needed
  }
};

export const undoDeleteAndReact = async (id, isReact) => {
  try {
    if (isReact) {
      const response = await HandleApi.serverGeneral.patch(
        `/v1/community/posts/post-details/comments/${id}?react=1`
      );
      // console.log(response.data);
      return response.data;
    } else {
      const response = await HandleApi.serverGeneral.patch(
        `/v1/community/posts/post-details/comments/${id}`
      );
      // console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null; // Return null or handle the error as needed
  }
};
