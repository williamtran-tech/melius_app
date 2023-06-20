// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
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

const RegisterScreen = ({ navigation }) => {
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();
  const [loading, setLoading] = useState(false);
  const [contactType, setContactType] = useState("email");
  const [contact, setContact] = useState("");

  const handleChangeContact = (value) => {
    setContact(value);
  };

  const handleSelectContactType = (type) => {
    setContactType(type);
  };
  const handleSubmitButton = (values) => {
    // setLoading(true);
    console.log(values);
    // var dataToSend = {
    //   name: userName,
    //   email: userEmail,
    //   address: userAddress,
    //   password: userPassword,
    // };

    //   fetch("http://localhost:3000/api/user/register", {
    //     method: "POST",
    //     body: formBody,
    //     headers: {
    //       //Header Defination
    //       "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       //Hide Loader
    //       setLoading(false);
    //       console.log(responseJson);
    //       // If server response message same as Data Matched
    //       if (responseJson.status === "success") {
    //         setIsRegistraionSuccess(true);
    //         console.log("Registration Successful. Please Login to proceed");
    //       } else {
    //         setErrortext(responseJson.msg);
    //       }
    //     })
    //     .catch((error) => {
    //       //Hide Loader
    //       setLoading(false);
    //       console.error(error);
    //     });
  };
  // if (isRegistraionSuccess) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: "#307ecc",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <Image
  //         source={
  //           "https://images.unsplash.com/photo-1686253795429-2fc371ac9895?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1773&q=80"
  //         }
  //         style={{
  //           height: 150,
  //           resizeMode: "contain",
  //           alignSelf: "center",
  //         }}
  //       />
  //       <Text style={styles.successTextStyle}>Registration Successful</Text>
  //       <TouchableOpacity
  //         style={styles.buttonStyle}
  //         activeOpacity={0.5}
  //         onPress={() => props.navigation.navigate("LoginScreen")}
  //       >
  //         <Text style={styles.buttonTextStyle}>Login Now</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }
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
                  onPress={handleSubmit}
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
export default RegisterScreen;

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
  },
});
