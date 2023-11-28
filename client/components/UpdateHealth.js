import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React from "react";
import Validation from "../Services/Authorizations/Validation";
import SubText from "./SubText";
import { Formik } from "formik";
import HandleApi from "../Services/HandleApi";
import { getUserProfile } from "../Services/RetrieveNutritionProfile";
import {
  createMealPlan,
  getMealPlan,
  SuggestMealPlanByDate,
} from "../Services/SuggestMealPlan";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateHealth = ({
  healthRecord,
  updateFlag,
  setUpdateFlag,
  setModalVisible,
}) => {
  console.log({
    weight: healthRecord.healthRecord[0].weight,
    height: healthRecord.healthRecord[0].height,
  });
  const handleSubmit = async (values) => {
    console.log({ kidId: healthRecord.id, ...values });
    try {
      const response = await HandleApi.serverGeneral.patch(
        `/v1/users/child-health`,
        { kidId: healthRecord.id, ...values }
      );

      const mealplan = await SuggestMealPlanByDate();
      const getUserInf = await getUserProfile();

      await AsyncStorage.setItem("mealPlan", JSON.stringify(mealplan));
      setUpdateFlag(!updateFlag);
      setModalVisible(false);
      console.log(response.data);
    } catch (error) {
      console.error(error);

    }
  };
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Formik
          initialValues={{
            weight: healthRecord.healthRecord[0].weight.toString(),
            height: healthRecord.healthRecord[0].height.toString(),
          }}
          validationSchema={Validation.validationChildRecordSchema}
          onSubmit={handleSubmit}
          validateOnChange
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
          }) => (
            <View>
              <View style={styles.SectionStyle}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 15,
                  }}
                >
                  <SubText style={{ fontSize: 15 }}>Weight</SubText>
                  <TextInput
                    style={styles.inputNumberStyle}
                    onChangeText={handleChange("weight")}
                    onBlur={handleBlur("weight")}
                    value={values.weight}
                    placeholder="Kg"
                    keyboardType="numeric"
                  />
                  <SubText>Kg</SubText>
                  {errors.weight && <Text>{errors.weight}</Text>}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 15,
                  }}
                >
                  <SubText style={{ fontSize: 15 }}>Height</SubText>
                  <TextInput
                    style={styles.inputNumberStyle}
                    onChangeText={handleChange("height")}
                    onBlur={handleBlur("height")}
                    value={values.height}
                    placeholder="Cm"
                    keyboardType="numeric"
                  />
                  <SubText>Cm</SubText>
                  {errors.height && <Text>{errors.height}</Text>}
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                }}
              >
                <Button onPress={handleSubmit} title="Submit" />
                <Button
                  onPress={() => setModalVisible(false)}
                  title="Cancel"
                  color={"#FF0000"}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default UpdateHealth;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(69, 66, 67, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: { backgroundColor: "#FDFDFD", borderRadius: 30 },
  SectionStyle: {
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 60,
    marginRight: 60,
    gap: 20,
  },
  inputNumberStyle: {
    color: "white",
    height: 35,
    width: 60,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dadae8",
    color: "#000",
    shadowOffset: { height: 0, width: -10 },
    shadowRadius: 4,
    elevation: 25,
    shadowColor: "rgba(26, 26, 26, 0.2)",
    backgroundColor: "rgba(249, 249, 249, 1)",
  },
});
