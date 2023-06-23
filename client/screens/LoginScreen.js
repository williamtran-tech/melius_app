// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";
import HeaderText from "../components/HeaderText";
import SubText from "../components/SubText";
import { TouchableWithoutFeedback } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Formik } from "formik";
import Validation from "../Services/Authorizations/Validation";
import qs from "qs";
const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  const passwordInputRef = createRef();

  const handleSubmitPress = (values) => {
    // AsyncStorage.setItem("user_id", "OOOHH SHITTTTTTT");
    // navigation.replace("BottomNavigation");
    console.log(qs.stringify(values));
    setLoading(true);
    // let dataToSend = { email: userEmail, password: userPassword };
    // let formBody = [];
    // for (let key in dataToSend) {
    //   let encodedKey = encodeURIComponent(key);
    //   let encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");

    fetch("http://192.168.102.100:5050/api/v1/auth/login", {
      method: "POST",
      body: qs.stringify(values),
      headers: {
        //Header Defination
        "Content-Type": "application/x-www-form-urlencoded",
        credentials: "include",
      },
    })
      .then((response) => {
        let receivedCookies = response.headers.get("set-cookie");
        if (receivedCookies) AsyncStorage.setItem("cookies", receivedCookies);
        console.log(receivedCookies);

        if (response.status === 200) {
          // Convert the response to JSON
          return response.json();
        }
      })
      .then((responseJson) => {
        setLoading(false);
        console.log(responseJson);
        navigation.replace("BottomNavigation");
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Loader loading={loading} />
        <HeaderText style={{ color: "rgba(81, 139, 26, 1)", fontSize: 25 }}>
          Login
        </HeaderText>
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ backgroundColor: "#fff" }}
          onPress={Keyboard.dismiss}
        >
          <Formik
            validateOnChange={true}
            validationSchema={Validation.loginValidationSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmitPress}
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
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange("email")}
                    placeholder="Email" //dummy@abc.com
                    onBlur={handleBlur("email")}
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    value={values.email}
                    onSubmitEditing={() =>
                      passwordInputRef.current &&
                      passwordInputRef.current.focus()
                    }
                    underlineColorAndroid="#f000"
                  />
                </View>
                {errors.email && touched.email && (
                  <Text style={{ color: "#DD0000", marginLeft: 15 }}>
                    {errors.email}
                  </Text>
                )}
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    placeholder="Enter Password" //12345
                    placeholderTextColor="#8b9cb5"
                    keyboardType="default"
                    value={values.password}
                    ref={passwordInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                  />
                </View>
                {errors.password && touched.password && (
                  <Text style={{ color: "#DD0000", marginLeft: 15 }}>
                    {errors.password}
                  </Text>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 15,
                    paddingHorizontal: 5,
                  }}
                >
                  <SubText
                    style={styles.forgotTextStyle}
                    onPress={() => navigation.navigate("ForgotPassword")}
                  >
                    Forgot password?
                  </SubText>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("RegisterScreen")}
                  >
                    <SubText style={styles.registerTextStyle}>Register</SubText>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={handleSubmit}
                  disabled={!isValid || values.email === ""}
                >
                  <Text style={styles.buttonTextStyle}>LOGIN</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    width: 265,
    marginTop: 27,
  },
  buttonStyle: {
    backgroundColor: "rgba(140, 200, 64, 1)",
    borderWidth: 0,

    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "white",
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
  forgotTextStyle: {
    color: "rgba(140, 140, 140, 1)",
    fontSize: 14,
  },
  registerTextStyle: {
    color: "rgba(81, 139, 26, 1)",
    fontSize: 14,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
