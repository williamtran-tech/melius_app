import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import HeaderText from "../components/HeaderText";
import Loader from "../components/Loader";
import SubText from "../components/SubText";
import RNPickerSelect from "react-native-picker-select";
import { Formik } from "formik";
import Validation from "../Services/Authorizations/Validation";

const RegisterForm = ({ navigation, setStage }) => {
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const passwordInputRef = createRef();
  const [loading, setLoading] = useState(false);

  const handleSubmitButton = (values) => {
    // setLoading(true);
    setStage("stage2");
    console.log(values);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{ flex: 1, justifyContent: "center", backgroundColor: "#fff" }}
      >
        <Loader loading={loading} />
        <HeaderText
          style={{ textAlign: "center", color: "#518B1A", fontSize: 25 }}
        >
          Register
        </HeaderText>
        <KeyboardAvoidingView
          enabled
          style={{ justifyContent: "center", display: "flex" }}
        >
          <Formik
            initialValues={{
              fullName: "",
              phoneNumber: "",
              email: "",
              verifyMethod: "",
            }}
            validateOnChange={true}
            validationSchema={Validation.registerValidationSchema}
            onSubmit={(values) => handleSubmitButton(values)}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
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
                    onChangeText={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    value={values.fullName}
                    underlineColorAndroid="#f000"
                    placeholder="Enter Name"
                    placeholderTextColor="#8C8C8C"
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      emailInputRef.current && emailInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                  {touched.fullName && errors.fullName && (
                    <Text style={styles.errorText}>{errors.fullName}</Text>
                  )}
                </View>
                <View style={styles.SectionStyle}>
                  <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                    Phone number
                  </SubText>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange("phoneNumber")}
                    onBlur={handleBlur("phoneNumber")}
                    value={values.phoneNumber}
                    underlineColorAndroid="#f000"
                    placeholder="Enter Phone Number"
                    placeholderTextColor="#8C8C8C"
                    keyboardType="numeric"
                    ref={emailInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      passwordInputRef.current &&
                      passwordInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                  )}
                </View>
                <View style={styles.SectionStyle}>
                  <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                    Email
                  </SubText>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    underlineColorAndroid="#f000"
                    placeholder="Enter Email"
                    placeholderTextColor="#8C8C8C"
                    keyboardType="email-address"
                    ref={passwordInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      ageInputRef.current && ageInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.SectionStyle}>
                  <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                    Verify method
                  </SubText>
                  <RNPickerSelect
                    value={values.verifyMethod}
                    onValueChange={handleChange("verifyMethod")}
                    placeholder={{
                      label: "Choose method to get verify code...",
                      color: "#8C8C8C",
                      value: "default",
                    }}
                    items={[
                      { label: "Email", value: "email" },
                      { label: "Phone", value: "phone" },
                    ]}
                    style={picker}
                  />
                  {touched.verifyMethod && errors.verifyMethod && (
                    <Text style={styles.errorText}>{errors.verifyMethod}</Text>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 60,
                  }}
                >
                  <SubText
                    style={styles.forgotTextStyle}
                    onPress={() => navigation.navigate("forgotTextStyle")}
                  >
                    Aldready have account
                  </SubText>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("LoginScreen")}
                  >
                    <SubText style={styles.registerTextStyle}>Login</SubText>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  //   onPress={handleSubmit}
                  onPress={() => setStage("stage2")}
                  disabled={!isValid}
                >
                  <Text style={styles.buttonTextStyle}>REGISTER</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default RegisterForm;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "Column",
    marginTop: 10,
    marginLeft: 60,
    marginRight: 60,
    margin: 10,
    gap: 5,
  },
  buttonStyle: {
    backgroundColor: "rgba(140, 200, 64, 1)",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
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
  errorText: {
    color: "red",
    fontSize: 14,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
  Picker: {
    height: 3000,
  },
  forgotTextStyle: {
    color: "rgba(140, 140, 140, 1)",
    fontSize: 14,
  },
  registerTextStyle: {
    color: "rgba(81, 139, 26, 1)",
    fontSize: 14,
  },
});
const picker = StyleSheet.create({
  inputIOS: {
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
  inputAndroid: {
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
});
