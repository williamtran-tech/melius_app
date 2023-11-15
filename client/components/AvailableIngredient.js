import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  deleteAllergy,
  deleteIngredient,
  getAvailableIngredient,
} from "../Services/IngredientApi";
import SubText from "./SubText";

const AvailableIngredient = ({
  ingredient,
  updateFlag,
  setUpdateFlag,
  allergy,
  kidId,
}) => {
  // const [ingredient, setingredient] = useState();
  // const handleGetIngredient = async () => {
  //   const response = await getAvailableIngredient();
  //   setingredient(response);
  // };
  // useEffect(() => {
  //   handleGetIngredient();
  //   // console.log(updateFlag);
  // }, []);
  const deleteIngre = async (id) => {
    const response = await deleteIngredient(id);
    setUpdateFlag(!updateFlag);
  };
  const deleteAller = async (id) => {
    const response = await deleteAllergy(id, kidId);
    setUpdateFlag(!updateFlag);
  };
  return (
    <View style={{}}>
      <SubText style={{ color: "#8C8C8C", fontSize: 14, paddingVertical: 10 }}>
        Selected {ingredient && ingredient.length}
      </SubText>
      <View style={styles.ingreContainer}>
        {ingredient &&
          ingredient.map((ingre, index) => (
            <TouchableOpacity
              style={styles.ingredientTag}
              key={index}
              onPress={() => {
                allergy ? deleteAller(ingre.id) : deleteIngre(ingre.id);
              }}
            >
              <Text>{ingre.ingredient.name}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default AvailableIngredient;

const styles = StyleSheet.create({
  ingreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  ingredientTag: {
    backgroundColor: "#8CC840",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
});
