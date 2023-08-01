import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SubText from "./SubText";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProjectNutrition = () => {
  const [targetPlan, setTargetPlan] = useState();

  useEffect(() => {
    AsyncStorage.getItem("mealPlan").then((value) => {
      // console.log("targettt:", JSON.parse(value));
      setTargetPlan(JSON.parse(value).mealPlan);
    });
  }, []);
  return (
    <View style={styles.container}>
      <SubText style={{ color: "#FF9600", fontSize: 12 }}>
        PROJECT NUTRITION
      </SubText>
      <View style={styles.infContainer}>
        <View>
          <SubText style={styles.inf}>
            {targetPlan && targetPlan.carbTarget.toFixed(2)}g
          </SubText>
          <SubText style={styles.title}>Carbs</SubText>
        </View>
        <View>
          <SubText style={styles.inf}>
            {targetPlan && targetPlan.fatTarget.toFixed(2)}g
          </SubText>
          <SubText style={styles.title}>Fat</SubText>
        </View>
        <View>
          <SubText style={styles.inf}>
            {targetPlan && targetPlan.proteinTarget.toFixed(2)}g
          </SubText>
          <SubText style={styles.title}>Protein</SubText>
        </View>
        <View>
          <SubText style={styles.infTotal}>
            ≈{targetPlan && targetPlan.energyTarget.toFixed()} cal
          </SubText>
          <SubText style={styles.titleTotal}>Energy</SubText>
        </View>
      </View>
    </View>
  );
};

export default ProjectNutrition;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFE",
    padding: 10,
    shadowOffset: {
      width: 2,
      height: -2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    borderRadius: 5,
  },
  infContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  inf: {
    color: "#8CC840",
    fontSize: 14,
    marginBottom: 5,
  },
  title: {
    color: "#FF9600",
    fontSize: 12,
    marginBottom: 5,
  },
  infTotal: {
    color: "#518B1A",
    fontSize: 18,
    fontWeight: "bold",
  },
  titleTotal: {
    color: "#FF9600",
    fontSize: 12,
  },
});
