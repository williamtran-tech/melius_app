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
const ComChatWithExpert = () => {
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
    const conversationId = 1;
    try {
      const collectionRef = collection(db, "doctoc2", "user2", "message");
      const docRef = await addDoc(collectionRef, docData);
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };
  const setupMessageListener = () => {
    const messagesRef = collection(db, "doctoc1", "user1", "message");
    const sortedMessagesQuery = query(messagesRef, orderBy("timestamp"));

    onSnapshot(
      sortedMessagesQuery,
      (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => doc.data());
        setMessages(messages);
        // Process the new messages
      },
      (error) => {
        console.error("Error listening to messages:", error);
      }
    );
  };
  const getAllDoctorChatsWithUser = async (userId) => {
    const doctorCollections = ["doctoc1", "doctoc2"]; // Replace with actual collection names
    const allDoctorChats = [];

    for (const collectionName of doctorCollections) {
      const doctorCollectionRef = collection(db, collectionName);
      const userChatsRef = collection(doctorCollectionRef, userId, "message");
      const querySnapshot = await getDocs(userChatsRef);
      const conversationsData = querySnapshot.docs.map((doc) => doc.data());

      if (conversationsData.length > 0) {
        allDoctorChats.push({
          doctorId: collectionName,
          conversations: conversationsData,
        });
      }
    }

    console.log("allDoctorChats:", allDoctorChats);
  };
  const getAllUserChatsWithDoctor = async (doctorId) => {
    const allDoctorChats = [];
    const doctorCollectionRef = collection(db, doctorId);

    const querySnapshot = await getDocs(userChatsRef);
    const allUserChats = querySnapshot.docs.map((userDoc) => {
      const conversationsData = userDoc.data().message || []; // Assuming 'message' is the field for conversations
      return {
        userId: userDoc.id,
        conversations: conversationsData,
      };
    });

    console.log("allUserChats:", allUserChats);
  };

  useEffect(() => {
    // existingMessages();
    setupMessageListener();
    getAllDoctorChatsWithUser("user1");
    getAllUserChatsWithDoctor("doctoc2");
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
          <MessageList messages={messages} type="expert" />
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
