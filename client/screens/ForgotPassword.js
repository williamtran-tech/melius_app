import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import ForgotPasswordInfor from "../components/ForgotPasswordInfor";
import ConfirmCode from "../components/ConfirmCode";
import PasswordSetting from "../components/PasswordSetting";
const ForgotPassword = () => {
  const [stage, setStage] = useState("stage1");
  const [confirmMethod, setConfirmMethod] = useState("");

  const RenderStage = () => {
    switch (stage) {
      case "stage1":
        return (
          <ForgotPasswordInfor
            setStage={setStage}
            setConfirmMethod={setConfirmMethod}
          ></ForgotPasswordInfor>
        );
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
            setStage={setStage}
            type={"setting"}
          ></PasswordSetting>
        );
      default:
        return null;
    }
  };

  return <RenderStage></RenderStage>;
};

export default ForgotPassword;

const styles = StyleSheet.create({});
