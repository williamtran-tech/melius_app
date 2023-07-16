import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import HandleApi from "../Services/HandleApi";
const ChatInput = ({ messages, sendMessage }) => {
  const [message, setMessage] = useState();
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInput}
        multiline={true}
        fontSize={16}
        value={message}
        onChangeText={(text) => setMessage(text)}
      ></TextInput>
      <TouchableOpacity
        onPress={() => {
          sendMessage(message);
          setMessage("");
        }}
      >
        <Image
          source={require("../assets/icon/IconSend.png")}
          style={styles.sendIcon}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDFDFD",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1,
    paddingHorizontal: 25,
    paddingBottom: 17,
    paddingTop: 7,
    // backgroundColor: "#000",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  TextInput: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingBottom: 5,
    paddingTop: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "rgba(26, 26, 26, 0.20)",
    borderWidth: 1,
  },
  sendIcon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
});
