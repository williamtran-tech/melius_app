import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Touch,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import HeaderText from "./HeaderText";
import SubText from "./SubText";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { Formik } from "formik";
import Validation from "../Services/Authorizations/Validation";
import HandleApi from "../Services/HandleApi";
import qs from "qs";

const ConfirmCode = ({ setStage, confirmMethod }) => {
  const [seconds, setSeconds] = useState(59);
  console.log(confirmMethod);
  const OPTdes = {
    title: "ENTER OPT CODE",
    description: "OTP code will be sent to your phone number",
    signal: "ME - ",
  };
  const Emaildes = {
    title: "ENTER CONFIRM CODE",
    description: "A confirmation code will be sent to your email.",
    signal: "LI - ",
  };
  const [methodVerify, setMethodVerify] = useState(
    confirmMethod === "phone" ? OPTdes : Emaildes
  );
  console.log(methodVerify);
  useEffect(() => {
    // Start the countdown timer
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [seconds]);
  console.log(methodVerify);
  const handleCodeChange = (code) => {
    // setStage("stage4");
    HandleApi.serverGeneral
      .post("v1/auth/verify", qs.stringify(code))
      .then((response) => {
        console.log(response.data);
        setStage("stage4");
      })
      .catch((error) => {
        console.error(error);
      });
    // console.log(code);
  };
  // if (seconds === 0) console.log("cc");
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <HeaderText
            style={{
              color: "#518B1A",
              fontSize: 22,
              textAlign: "center",
              marginBottom: 5,
            }}
          >
            {methodVerify && methodVerify.title && methodVerify.title}
          </HeaderText>
          <SubText
            style={{ color: "#8C8C8C", fontSize: 15, textAlign: "center" }}
          >
            {methodVerify &&
              methodVerify.description &&
              methodVerify.description}
          </SubText>
          <SubText
            style={{ color: "#8C8C8C", fontSize: 15, textAlign: "center" }}
          >
            Enter the code below for (
            {
              <Text
                style={{ color: "#518B1A", fontSize: 18, textAlign: "center" }}
              >
                {seconds && seconds}
              </Text>
            }
            seconds)
          </SubText>
          {/* <Formik
            initialValues={{ verifiedCode: "" }}
            validationSchema={Validation.OPTvalidationSchema}
            onSubmit={(values) => handleCodeChange(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    paddingHorizontal: 40,
                    marginVertical: 35,
                  }}
                >
                  <HeaderText
                    style={{
                      color: "#8C8C8C",
                      fontSize: 22,
                      textAlign: "center",
                    }}
                  >
                    {methodVerify && methodVerify.signal}
                  </HeaderText>
                  <OTPInputView
                    pinCount={4}
                    style={styles.OPTcontainer}
                    code={values.verifiedCode}
                    onCodeChanged={handleChange("verifiedCode")}
                    autoFocus={false}
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  />
                </View>
                <View>
                  <SubText
                    style={{
                      color: "#8C8C8C",
                      fontSize: 15,
                      textAlign: "center",
                    }}
                  >
                    Did not receive the OTP code? Send again
                  </SubText>
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isValid}
                  style={isValid ? styles.BtnEnable : styles.BtnDisable}
                >
                  <Text style={styles.buttonTextStyle}>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik> */}
          <Formik
            initialValues={{ verifiedCode: "" }}
            validationSchema={Validation.OPTvalidationSchema}
            onSubmit={handleCodeChange}
            validateOnChange
          >
            {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    paddingHorizontal: 40,
                    marginVertical: 35,
                  }}
                >
                  <HeaderText
                    style={{
                      color: "#8C8C8C",
                      fontSize: 22,
                      textAlign: "center",
                    }}
                  >
                    {methodVerify && methodVerify.signal}
                  </HeaderText>
                  <OTPInputView
                    pinCount={4}
                    style={styles.OPTcontainer}
                    code={values.verifiedCode}
                    onCodeChanged={handleChange("verifiedCode")}
                    autoFocus={false}
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  />
                </View>
                <View>
                  <SubText
                    style={{
                      color: "#8C8C8C",
                      fontSize: 15,
                      textAlign: "center",
                    }}
                  >
                    Did not receive the OTP code? Send again
                  </SubText>
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isValid}
                  style={isValid ? styles.BtnEnable : styles.BtnDisable}
                >
                  <Text style={styles.buttonTextStyle}>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          {/* <OTPInputView
            pinCount={4}
            style={styles.OPTcontainer}
            // code={values.verifiedCode}
            // onCodeChanged={handleChange("verifiedCode")}
            autofillFromClipboard={false}
            autoFocus={false}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
          /> */}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ConfirmCode;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  OPTcontainer: {
    height: 50,
    flex: 1,
    paddingLeft: 10,
  },

  underlineStyleBase: {
    width: 49,
    height: 42,
    borderWidth: 0,
    color: "#000",
    fontSize: 20,
    borderBottomWidth: 1,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
  },

  underlineStyleHighLighted: {
    borderColor: "rgba(140, 200, 64, 1)",
  },
  BtnEnable: {
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
  BtnDisable: {
    backgroundColor: "#a6a6a6",
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
});
