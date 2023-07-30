import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Button,
  View,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import Validation from "../Services/Authorizations/Validation";
import HeaderText from "./HeaderText";
import SubText from "./SubText";
import RadioGroup from "react-native-radio-buttons-group";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import HandleApi from "../Services/HandleApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getUserProfile } from "../Services/RetrieveNutritionProfile";
const ProfileChildeFrom = () => {
  const navigation = useNavigation();
  const handleSubmit = async (values) => {
    try {
      const response = await HandleApi.serverGeneral.post(
        "v1/users/create-child",
        values
      );
      await AsyncStorage.setItem("childrenInf", JSON.stringify(response.data));

      await HandleApi.serverGeneral.post("v1/users/meal-plan", {
        kidId: response.data.child.id,
      });
      const userProfile = await getUserProfile();
      // const mealPlanResponse = await HandleApi.serverGeneral.post(
      //   "v1/users/meal-plan",
      //   {
      //     kidId: response.data.child.id,
      //   }
      // );
      // await AsyncStorage.setItem(
      //   "mealPlan",
      //   JSON.stringify(mealPlanResponse.data)
      // );
      // const storedMealPlan = await AsyncStorage.getItem("mealPlan");
      // console.log(storedMealPlan);
      // console.log("Stored Meal Plan:", JSON.parse(storedMealPlan));
      const mealplan = await HandleApi.serverGeneral.get(
        `/v1/users/meal-plan?kidId=${response.data.child.id}`
      );
      await AsyncStorage.setItem("mealPlan", JSON.stringify(mealplan.data));
      console.log("oke nha:", response.data.child.id);

      navigation.replace("BottomNavigation");
    } catch (error) {
      // Handle errors appropriately
      console.error(error);
      // setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <HeaderText
          style={{
            textAlign: "center",
            color: "#518B1A",
            fontSize: 25,
            textTransform: "uppercase",
          }}
        >
          Children profile
        </HeaderText>
        <Formik
          initialValues={{
            fullName: "",
            gender: "",
            dob: new Date(),
            weight: "",
            height: "",
          }}
          validationSchema={Validation.validationProfileChildSchema}
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
                <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                  Fullname
                </SubText>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                  placeholder="Full Name"
                />
                {errors.fullName && <Text>{errors.fullName}</Text>}
              </View>
              <View style={styles.SectionStyleRow}>
                <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                  Gender
                </SubText>
                <RadioGroup
                  layout="row"
                  radioButtons={[
                    { id: "male", label: "Male", value: "male" },
                    { id: "female", label: "Female", value: "female" },
                  ]}
                  onPress={(value) => setFieldValue("gender", value)}
                  selectedId={values.gender}
                  borderColor="#8C8C8C"
                />
                {errors.gender && <Text>{errors.gender}</Text>}
              </View>
              <View style={styles.SectionStyleRow}>
                <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                  Birthday
                </SubText>
                <DateTimePicker
                  value={values.dob}
                  mode="date"
                  display="clock"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || values.dob;
                    setFieldValue("dob", currentDate);
                  }}
                />
                {errors.dob && <Text>{errors.dob}</Text>}
              </View>

              <View style={styles.SectionStyle}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 15,
                  }}
                >
                  <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                    Weight
                  </SubText>
                  <TextInput
                    style={styles.inputNumberStyle}
                    onChangeText={handleChange("weight")}
                    onBlur={handleBlur("weight")}
                    value={values.weight}
                    placeholder="Kg"
                    keyboardType="numeric"
                  />
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
                  <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                    Height
                  </SubText>
                  <TextInput
                    style={styles.inputNumberStyle}
                    onChangeText={handleChange("height")}
                    onBlur={handleBlur("height")}
                    value={values.height}
                    placeholder="Cm"
                    keyboardType="numeric"
                  />
                  {errors.height && <Text>{errors.height}</Text>}
                </View>
              </View>

              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileChildeFrom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FDFDFD",
  },
  formcontainer: {
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    // backgroundColor: "#000",
  },
  SectionStyle: {
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 60,
    marginRight: 60,
    gap: 5,
  },
  SectionStyleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 60,
    marginRight: 60,
    gap: 5,
  },
  inputStyle: {
    color: "white",
    height: 35,
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
