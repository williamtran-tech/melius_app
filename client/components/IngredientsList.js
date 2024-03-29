import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import AvailableIngredient from "./AvailableIngredient";
import HeaderText from "./HeaderText";
import SubText from "./SubText";

const IngredientsList = ({
  selectedItem,
  listItem,
  deleteItemfromWishlist,
  moveItemToWishlist,
  handleSearchPress,
  updateFlag,
  setUpdateFlag,
}) => {
  useEffect(() => {}, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.ingredientContainer}>
        <View style={styles.searchbar}>
          <HeaderText
            style={{ color: "#518B1A", fontSize: 18, paddingVertical: 10 }}
          >
            All Ingredients
          </HeaderText>
          <TouchableOpacity onPress={handleSearchPress}>
            <Image
              source={require("../assets/icon/IconSearch.png")}
              style={{ width: 20, height: 20 }}
            ></Image>
          </TouchableOpacity>
        </View>
        <FlatList
          data={listItem}
          numColumns={5}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => moveItemToWishlist(item)}
                >
                  <Image
                    source={item.source}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <SubText style={styles.name}>{item.name}</SubText>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default IngredientsList;

const styles = StyleSheet.create({
  ingredientContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentContainer: {
    flexGrow: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },
  itemContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
  },
  icon: {
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 8,
  },
  selectedContainer: {
    justifyContent: "space-between",
    // backgroundColor: "#000",
  },
  searchbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
