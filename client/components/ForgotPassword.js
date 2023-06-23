import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import Validation from "../Services/Authorizations/Validation";
import SubText from "./SubText";
import HeaderText from "./HeaderText";

const ForgotPassword = ({ setStage }) => {
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  return (
    <View style={styles.container}>
      <HeaderText
        style={{ textAlign: "center", color: "#518B1A", fontSize: 25 }}
      >
        ENTER PASSWORD
      </HeaderText>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={Validation.PasswordSettingSchema}
        onSubmit={handleFormSubmit}
        validateOnMount
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <View style={styles.SectionStyle}>
              <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                Fullname
              </SubText>
              <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>
            <View style={styles.SectionStyle}>
              <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                Fullname
              </SubText>
              <TextInput
                style={styles.inputStyle}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!isValid}
              style={isValid ? styles.BtnEnable : styles.BtnDisable}
            >
              <Text style={styles.buttonTextStyle}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  SectionStyle: {
    flexDirection: "Column",
    marginTop: 10,
    marginLeft: 60,
    marginRight: 60,
    margin: 10,
    gap: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  inputStyle: {
    color: "white",
    height: 35,
    paddingLeft: 15,
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
  BtnEnable: {
    backgroundColor: "rgba(140, 200, 64, 1)",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  BtnDisable: {
    backgroundColor: "#a6a6a6",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
});
