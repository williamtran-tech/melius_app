// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef, useEffect } from "react";
import { View } from "react-native";
import HeaderText from "../components/HeaderText";
import Loader from "../components/Loader";
import SubText from "../components/SubText";
import RNPickerSelect from "react-native-picker-select";
import { Formik } from "formik";
import Validation from "../Services/Authorizations/Validation";
import RegisterForm from "../components/RegisterForm";
import AgreeForm from "../components/AgreeForm";

const RegisterScreen = ({ navigation }) => {
  const [stage, setStage] = useState("stage1");
  const RenderStage = () => {
    switch (stage) {
      case "stage1":
        return (
          <RegisterForm
            navigation={navigation}
            setStage={setStage}
            currentStage={stage}
          />
        );
      case "stage2":
        return <AgreeForm></AgreeForm>;
      case "stage3":
        return <HeaderText>Stage 3</HeaderText>;
      // Add more cases for each stage
      default:
        return null;
    }
  };

  return <RenderStage></RenderStage>;
};
export default RegisterScreen;
