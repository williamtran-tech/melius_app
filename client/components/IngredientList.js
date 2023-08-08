import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SubText from "./SubText";

const IngredientList = ({ data }) => {
  console.log(data);
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <View style={{ flex: 1 }}>
      {data &&
        data.ingredients.map((ingre, index) => (
          <View style={styles.ingredientItem} key={index}>
            <SubText style={styles.IngredientName}>
              {capitalizeFirstLetter(ingre)}
            </SubText>
            <SubText style={styles.IngredientQuantity}>quanity</SubText>
          </View>
        ))}
    </View>
  );
};

export default IngredientList;

const styles = StyleSheet.create({
  ingredientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderBottomColor: "#8CC840",
    borderBottomWidth: 1,
  },
  IngredientName: {
    fontSize: 16,
    color: "#1A1A1A",
  },
  IngredientQuantity: {
    fontSize: 14,
  },
});
