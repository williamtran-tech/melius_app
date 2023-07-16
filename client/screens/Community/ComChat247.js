import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChatInput from "../../components/ChatInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HandleApi from "../../Services/HandleApi";
import MessageList from "../../components/MessageList";
import { LinearGradient } from "expo-linear-gradient";
import SubText from "../../components/SubText";
import HeaderText from "../../components/HeaderText";
const ComChat247 = () => {
  const [messages, setMessages] = useState();
  const [messages1, setMessages1] = useState();
  const existingMessages = async () => {
    const data = await AsyncStorage.getItem("users");
    setMessages(data ? JSON.parse(data) : []);
    return messages;
  };
  const sendMessage = async (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", message: message },
    ]);

    const response = await HandleApi.generateResponse(message);

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "system", message: response },
    ]);
  };

  useEffect(() => {
    existingMessages();
  }, []);

  return (
    <LinearGradient
      colors={["#ffbd6017", "#FDFDFD", "#FDFDFD"]}
      locations={[0, 0.215, 1]}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <View style={styles.Header}>
          <SubText style={styles.headerText}>❮</SubText>
          <Image
            source={require("../../assets/images/AvatarChatbot.png")}
            style={styles.avatar}
          ></Image>
          <HeaderText style={styles.headerText}>Chat 24/7</HeaderText>
        </View>
        <View style={{ flex: 1 }}>
          <MessageList messages={messages} />
        </View>
        <View>
          <ChatInput messages={messages} sendMessage={sendMessage}></ChatInput>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default ComChat247;

const styles = StyleSheet.create({
  Header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 25,
  },
  headerText: {
    color: "#FF9600",
    fontSize: 20,
  },
  avatar: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    marginHorizontal: 15,
    borderRadius: 22.25,
  },
});
