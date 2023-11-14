import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderText from "./HeaderText";
import SubText from "./SubText";

const NutritionFact = ({ nutrition, servingSize }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ ...styles.itemNutitionFact, borderBottomWidth: 3 }}>
        <HeaderText style={{ fontSize: 18 }}>Serving size</HeaderText>
        <HeaderText style={{ fontSize: 18 }}>{servingSize}g</HeaderText>
      </View>
      <View style={{ ...styles.itemNutitionFact, borderBottomWidth: 5 }}>
        <HeaderText style={{ fontSize: 24 }}>Calories</HeaderText>
        <HeaderText style={{ fontSize: 24 }}>{nutrition.calories}</HeaderText>
      </View>
      <View style={styles.itemNutitionFact}>
        <HeaderText>Total Fat</HeaderText>
        <SubText>{nutrition.totalFat}g</SubText>
      </View>
      <View style={styles.itemNutitionFact}>
        <HeaderText>Sugar</HeaderText>
        <SubText>{nutrition.sugar}g</SubText>
      </View>
      <View style={styles.itemNutitionFact}>
        <HeaderText>Sodium</HeaderText>
        <SubText>{nutrition.sodium}g</SubText>
      </View>
      <View style={styles.itemNutitionFact}>
        <HeaderText>Protein</HeaderText>
        <SubText>{nutrition.protein}g</SubText>
      </View>
      <View style={styles.itemNutitionFact}>
        <HeaderText>Saturated Fat</HeaderText>
        <SubText>{nutrition.saturatedFat}g</SubText>
      </View>
      <View style={styles.itemNutitionFact}>
        <HeaderText>Carbohydrates</HeaderText>
        <SubText>{nutrition.carbohydrates}g</SubText>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  itemNutitionFact: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderBottomColor: "#8CC840",
    borderBottomWidth: 1,
  },
});
export default NutritionFact;
