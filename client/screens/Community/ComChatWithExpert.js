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

import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../../Services/FirebaseChat";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import SubText from "../../components/SubText";
import HeaderText from "../../components/HeaderText";
const ComChatWithExpert = ({ route }) => {
  const { chatId } = route.params;
  console.log("cc", chatId);
  const [messages, setMessages] = useState([]);
  const [messages1, setMessages1] = useState();
  // const existingMessages = async () => {
  //   const data = await AsyncStorage.getItem("users");
  //   setMessages(data ? JSON.parse(data) : []);
  //   return messages;
  // };
  // const databaseRef = FirebaseChat.database().ref(
  //   "https://meliuschat-default-rtdb.firebaseio.com/melius"
  // );
  // databaseRef.on("value", (snapshot) => {
  //   const data = snapshot.val();
  //   // Handle the retrieved data, update your component state, or perform any necessary operations
  // });
  const sendMessage = async (message) => {
    const docData = {
      message: message,
      role: "user",
      timestamp: serverTimestamp(),
    };
    try {
      // const conversationRef = await addDoc(collection(db, "conversations"), {
      //   participants: ["user2", "doctor1"],
      // });
      // const conversationId = conversationRef.id;
      // console.log(conversationId);
      const messagesRef = collection(db, "conversations", chatId, "messages");
      await addDoc(messagesRef, docData);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };
  const setupMessageListener = () => {
    const messagesRef = collection(db, "conversations", chatId, "messages");
    const sortedMessagesQuery = query(
      messagesRef,
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(sortedMessagesQuery, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messages);
    });
  };
  const getAllDoctorChatsWithUser = async () => {
    // const conversationsRef = collection(db, "conversations");
    // const userConversationsQuery = query(
    //   conversationsRef,
    //   where("participants", "array-contains", "doctor1")
    // );
    // const userConversationsSnapshot = await getDocs(userConversationsQuery);
    // const userConversations = userConversationsSnapshot.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));
    // console.log("User Conversations:", userConversations);
  };

  useEffect(() => {
    // existingMessages();
    setupMessageListener();
    getAllDoctorChatsWithUser();
    // loadConversations();
  }, []);

  return (
    <LinearGradient
      colors={["#F4FEE2", "#FDFDFD", "#FDFDFD"]}
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
            source={require("../../assets/images/imageDoctor.png")}
            style={styles.avatar}
          ></Image>
          <HeaderText style={styles.headerText}>
            Dr. Nguyen Thi Thuy Vy
          </HeaderText>
        </View>
        <View style={{ flex: 1 }}>
          {messages && <MessageList messages={messages} type="expert" />}
        </View>
        <View>
          <ChatInput messages={messages} sendMessage={sendMessage}></ChatInput>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default ComChatWithExpert;

const styles = StyleSheet.create({
  Header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 25,
  },
  headerText: {
    color: "#518B1A",
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
