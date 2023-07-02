// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef, useEffect } from "react";
import { View, Text } from "react-native";
import HeaderText from "../components/HeaderText";
import Loader from "../components/Loader";
import SubText from "../components/SubText";
import RNPickerSelect from "react-native-picker-select";
import { Formik } from "formik";
import Validation from "../Services/Authorizations/Validation";
import RegisterForm from "../components/RegisterForm";
import AgreeForm from "../components/AgreeForm";
import ConfirmCode from "../components/ConfirmCode";
import PasswordSetting from "../components/PasswordSetting";
import ProfileChildeFrom from "../components/ProfileChildeFrom";

const RegisterScreen = ({ navigation }) => {
  const [stage, setStage] = useState("stage1");
  const [confirmMethod, setConfirmMethod] = useState("");
  const RenderStage = () => {
    switch (stage) {
      case "stage1":
        return (
          <RegisterForm
            navigation={navigation}
            setStage={setStage}
            setConfirmMethod={setConfirmMethod}
          />
        );
      case "stage2":
        return <AgreeForm setStage={setStage}></AgreeForm>;
      case "stage3":
        return (
          <ConfirmCode
            setStage={setStage}
            confirmMethod={confirmMethod}
          ></ConfirmCode>
        );
      case "stage4":
        return (
          <PasswordSetting
            navigation={navigation}
            type={"setting"}
            setStage={setStage}
          ></PasswordSetting>
        );
      case "stage5":
        return <ProfileChildeFrom navigation={navigation}></ProfileChildeFrom>;
      default:
        return null;
    }
  };

  return <RenderStage></RenderStage>;
};
export default RegisterScreen;
