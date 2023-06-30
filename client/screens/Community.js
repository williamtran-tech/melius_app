import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChatInput from "../components/ChatInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HandleApi from "../Services/HandleApi";
import MessageList from "../components/MessageList";
const Community = () => {
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
      { role: "user", content: message },
    ]);

    const response = await HandleApi.generateResponse(message);

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "system", content: response },
    ]);
  };

  useEffect(() => {
    existingMessages();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        style={{
          flex: 1,
          backgroundColor: "#FDFDFD",
        }}
      >
        <View style={{ flex: 1 }}>
          <MessageList messages={messages} />
        </View>

        <View>
          <ChatInput messages={messages} sendMessage={sendMessage}></ChatInput>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Community;

const styles = StyleSheet.create({});
