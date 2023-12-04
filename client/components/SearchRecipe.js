import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import HandleApi from "../Services/HandleApi";
import { imageSearchEngine } from "../Services/FoodSearching";
import SubText from "./SubText";
import HeaderText from "./HeaderText";
import { getRecipeIngredient } from "../Services/SuggestMealPlan";
import Loader from "./Loader";

const SearchRecipe = ({ setRecipeId, setType }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [recipeIngre, setRecipeIngre] = useState();
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
      })
      .catch((error) => console.log(error));
  };
  const getRecipeIngre = async () => {
    const result = await getRecipeIngredient();
    const mappedArray = Object.entries(result.recipes).map(
      ([ingre, recipes]) => {
        return { ingre, recipes };
      }
    );

    console.log("mappedArray:", mappedArray);
    setRecipeIngre(mappedArray);
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
    const url = await imageSearchEngine(name);
    return url;
  };
  useEffect(() => {
    const fetchRecipeImages = async () => {
      const imageUrls = {};
      if (searchText == "") {
        for (const recipes of recipeIngre) {
          for (const recipe of recipes.recipes) {
            const imageUrl = await searchEngine(recipe.name);
            imageUrls[recipe.id] = imageUrl;
          }
        }
      } else {
        for (const recipe of searchResults) {
          const imageUrl = await searchEngine(recipe.name);
          imageUrls[recipe.id] = imageUrl;
        }
      }

      setRecipeImages(imageUrls);
    };
    fetchRecipeImages();
    getRecipeIngre();
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
      <View style={{ paddingBottom: 50 }}>
        {searchText == "" ? (
          <ScrollView>
            {recipeIngre &&
              recipeIngre?.map((item, index) =>
                item.recipes.map((recipe) => (
                  <TouchableOpacity
                    onPress={() => {
                      console.log(recipe.id);
                      setRecipeId(recipe.id);
                    }}
                  >
                    <View style={styles.recipecontainer}>
                      <View style={{ flex: 2 }}>
                        {recipeImages[recipe.id] ? (
                          <Image
                            source={{
                              uri:
                                recipeImages[recipe.id] &&
                                recipeImages[recipe.id],
                            }}
                            style={{ flex: 1, aspectRatio: 16 / 14 }}
                          />
                        ) : (
                          <ActivityIndicator
                            animating={true}
                            color="#000000"
                            size="large"
                            style={styles.activityIndicator}
                          />
                        )}
                      </View>
                      <View style={{ flex: 2, paddingLeft: 10 }}>
                        <SubText>{capitalizeFirstLetter(recipe.name)}</SubText>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: "flex-end",
                        }}
                      ></View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
          </ScrollView>
        ) : (
          // <FlatList
          //   data={recipeIngre}
          //   renderItem={({ item }) => {
          //     console.log("recipeeeee:", item);
          //     return (
          //       <TouchableOpacity
          //         onPress={() => {
          //           console.log(item.id);
          //           setRecipeId(item.id);
          //           setType(item.type);
          //         }}
          //       >
          //         <View style={styles.recipecontainer}>
          //           <View style={{ flex: 2 }}>
          //             <Image
          //               source={{ uri: recipeImages[item.id] }}
          //               style={{ flex: 1, aspectRatio: 16 / 14 }}
          //             />
          //           </View>
          //           <View style={{ flex: 2, paddingLeft: 10 }}>
          //             <SubText>{capitalizeFirstLetter(item.name)}</SubText>
          //           </View>
          //           <View
          //             style={{
          //               flex: 1,
          //               alignItems: "flex-end",
          //             }}
          //           >
          //             <SubText>{item.nSteps}</SubText>
          //           </View>
          //         </View>
          //       </TouchableOpacity>
          //     );
          //   }}
          //   keyExtractor={(item) => item.id.toString()}
          // />
          searchResults &&
          searchResults && (
            <FlatList
              data={searchResults}
              renderItem={({ item }) => {
                console.log("recipeeeee:", item);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      console.log(item.id);
                      setRecipeId(item.id);
                      setType(item.type);
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
          )
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
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
