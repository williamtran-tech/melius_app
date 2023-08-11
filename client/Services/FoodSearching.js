import { CustomSearch_Key } from "@env";
import axios from "axios";
export const imageSearchEngine = async (foodName) => {
  // try {
  //   const response = await axios.get(
  //     `https://www.googleapis.com/customsearch/v1`,
  //     {
  //       params: {
  //         key: CustomSearch_Key,
  //         cx: "b5856b96fecfa4b4c",
  //         q: foodName,
  //         //   searchType: "image",
  //         //   imgSize: "large", // Set the desired image size to 'large'
  //       },
  //     }
  //   );
  //   console.log(response.data.items[0].pagemap.cse_image[0].src);
  //   const imageUrls = response.data.items.map((item) => item.link);
  //   return response.data.items[0].pagemap.cse_image[0].src;
  // } catch (error) {
  //   console.error("Error fetching images:", error.message);
  //   return "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";
  // }
  try {
    const response = await axios.get(`https://api.edamam.com/search`, {
      params: {
        app_id: "900da95e",
        app_key: "40698503668e0bb3897581f4766d77f9",
        q: foodName,
      },
    });
    if (
      response.data.hits[0] &&
      response.data.hits[0].recipe &&
      response.data.hits[0].recipe.image
    )
      return response.data.hits[0].recipe.image;
    else
      return "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";
  } catch (error) {
    console.error("Error fetching images:", error.message);
  }
  // return "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";
};
