import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getAvailableIngredient } from "../Services/IngredientApi";

const AvailableIngredient = ({ ingredient }) => {
  // const [ingredient, setingredient] = useState();
  // const handleGetIngredient = async () => {
  //   const response = await getAvailableIngredient();
  //   setingredient(response);
  // };
  // useEffect(() => {
  //   handleGetIngredient();
  //   // console.log(updateFlag);
  // }, []);

  return (
    <View>
      {ingredient &&
        ingredient.map((ingre) => (
          <View>
            <Text>{ingre.ingredient.name}</Text>
          </View>
        ))}
    </View>
  );
};

export default AvailableIngredient;

const styles = StyleSheet.create({});
