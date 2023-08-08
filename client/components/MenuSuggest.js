import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderText from "./HeaderText";
import { ScrollView } from "react-native-gesture-handler";
import SubText from "./SubText";
import HandleApi from "../Services/HandleApi";
import { imageSearchEngine } from "../Services/FoodSearching";
import { useNavigation } from "@react-navigation/native";

const MenuSuggest = () => {
  const navigation = useNavigation();
  const [searchResults, setSearchResults] = useState([]);
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const searchEngine = async (name) => {
    // Assuming imageSearchEngine returns the URL of the recipe image
    const url = await imageSearchEngine(name);
    return url;
  };
  const [recipeImages, setRecipeImages] = useState({});

  const searchRecipe = async (value) => {
    const response = await HandleApi.serverGeneral.get("v1/recipes", {
      params: {
        limit: 5,
      },
    });
    // console.log("recipeID", response.data.recipes);

    const imageUrls = {};
    for (const recipe of response.data.recipes) {
      const imageUrl = await searchEngine(recipe.name);
      imageUrls[recipe.id] = imageUrl;
    }
    setRecipeImages(imageUrls);
    setSearchResults(response.data.recipes);
  };

  useEffect(() => {
    searchRecipe();
    console.log("url:", recipeImages);
  }, []);
  return (
    <View>
      <HeaderText style={{ fontSize: 18, color: "#518B1A", paddingLeft: 25 }}>
        Handbook of suggestions
      </HeaderText>
      <ScrollView>
        {searchResults &&
          searchResults.map((menuItem) => {
            return (
              <TouchableOpacity
                key={menuItem.id}
                onPress={() => {
                  navigation.navigate(
                    navigation.navigate("Menu", {
                      screen: "MenuDetail",
                      params: {
                        data: menuItem,
                      },
                    })
                  );
                }}
              >
                <View style={styles.menuItemInf}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={
                        recipeImages && { uri: recipeImages[menuItem.id] }
                      }
                      style={{ height: 83, width: 121, resizeMode: "cover" }}
                    ></Image>
                  </View>
                  <View style={styles.menuItemText}>
                    <HeaderText style={styles.menuItemTitle}>
                      {capitalizeFirstLetter(menuItem.name)}
                    </HeaderText>
                    <SubText
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={styles.menuDescription}
                    >
                      Step: {menuItem.nSteps}, Ingredient:{" "}
                      {menuItem.nIngredients}
                    </SubText>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default MenuSuggest;

const styles = StyleSheet.create({
  menuItemInf: {
    flexDirection: "row",
    marginHorizontal: 25,
    gap: 20,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#1A1A1A",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 4,
  },
  menuItemTitle: {
    color: "#518B1A",
    fontSize: 14,
  },
  menuItemText: {
    flex: 1,
    // backgroundColor: "#000",
  },
  menuDescription: {
    color: "#8C8C8C",
    fontSize: 12,
    lineHeight: 16,
    overflow: "hidden",
  },
  imageContainer: {
    backgroundColor: "#FFFFEE",
  },
});
