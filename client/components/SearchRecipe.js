import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import HandleApi from "../Services/HandleApi";
import { imageSearchEngine } from "../Services/FoodSearching";
import SubText from "./SubText";

const SearchRecipe = ({ setRecipeId }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const debounceTimeoutRef = useRef(null);

  const searchRecipe = (value) => {
    HandleApi.serverGeneral
      .get("v1/recipes/recipes-details", {
        params: {
          name: value,
        },
      })
      .then((response) => {
        console.log(response.data.recipes);
        setSearchResults(response.data.recipes);
        // console.log(response.data.ingredientsList[1].category);
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (text) => {
    setSearchText(text);
    // Perform search operation here based on the input text
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      searchRecipe(text);
    }, 500);
  };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [recipeImages, setRecipeImages] = useState({});

  const searchEngine = async (name) => {
    // Assuming imageSearchEngine returns the URL of the recipe image
    const url = await imageSearchEngine(name);
    return url;
  };
  useEffect(() => {
    const fetchRecipeImages = async () => {
      const imageUrls = {};
      for (const recipe of searchResults) {
        const imageUrl = await searchEngine(recipe.name);
        imageUrls[recipe.id] = imageUrl;
      }
      setRecipeImages(imageUrls);
    };

    fetchRecipeImages();
  }, [searchResults]);
  return (
    <View>
      <View style={styles.bottomSheetHeader}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter search text"
          value={searchText}
          onChangeText={handleInputChange}
        />
        {/* <TouchableOpacity onPress={handleClosePress}>
              <Text>Close</Text>
            </TouchableOpacity> */}
      </View>
      <View>
        {searchResults && searchResults && (
          <FlatList
            data={searchResults}
            renderItem={({ item }) => {
              console.log("recipeeeee:", item);
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log(item.id);
                    setRecipeId(item.id);
                  }}
                >
                  <View style={styles.recipecontainer}>
                    <View style={{ flex: 2 }}>
                      <Image
                        source={{ uri: recipeImages[item.id] }}
                        style={{ flex: 1, aspectRatio: 16 / 14 }}
                      />
                    </View>
                    <View style={{ flex: 2, paddingLeft: 10 }}>
                      <SubText>{capitalizeFirstLetter(item.name)}</SubText>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: "flex-end",
                      }}
                    >
                      <SubText>{item.nSteps}</SubText>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    </View>
  );
};

export default SearchRecipe;

const styles = StyleSheet.create({
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 25,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#8f8f8f",
    padding: 5,
    borderRadius: 20,
  },
  recipecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderBottomColor: "#8CC840",
    borderBottomWidth: 1,
  },
});
