import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import NavigatorMenu from "../../components/NavigatorMenu";
import HeaderText from "../../components/HeaderText";
import SubText from "../../components/SubText";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Services/FirebaseChat";

const ListChatBox = () => {
  const [conversations, setConversations] = useState();

  const conversationsRef = collection(db, "conversations");

  const targetUserID = "user2";
  const getlistDoctor = async () => {
    const userConversationsQuery = query(
      conversationsRef,
      where("participants", "array-contains", targetUserID)
    );

    onSnapshot(userConversationsQuery, async (querySnapshot) => {
      const updatedConversations = [];

      for (const conversationDoc of querySnapshot.docs) {
        const messagesRef = collection(conversationDoc.ref, "messages");
        const messagesQuery = query(
          messagesRef,
          orderBy("timestamp", "desc"),
          limit(1)
        );

        const unsubscribeMessages = onSnapshot(
          messagesQuery,
          (messagesSnapshot) => {
            const latestMessage = messagesSnapshot.docs.map((messageDoc) => ({
              id: messageDoc.id,
              ...messageDoc.data(),
            }))[0];

            const conversationData = {
              id: conversationDoc.id,
              latestMessage: latestMessage,
              ...conversationDoc.data(),
            };

            const existingIndex = updatedConversations.findIndex(
              (conv) => conv.id === conversationData.id
            );
            if (existingIndex !== -1) {
              updatedConversations[existingIndex] = conversationData;
            } else {
              updatedConversations.push(conversationData);
            }

            setConversations([...updatedConversations]);
          }
        );
      }
    });
  };
  useEffect(() => {
    getlistDoctor();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <NavigatorMenu
          // Date={null}
          ScreenName={"Messages"}
        ></NavigatorMenu>
      </View>
      <View style={styles.container}>
        {conversations &&
          conversations.map((message, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.messageItem}>
                <Image
                  source={require("../../assets/images/imageDoctor.png")}
                  style={styles.avatar}
                ></Image>
                <View style={styles.message}>
                  <HeaderText style={{ color: "#518B1A", fontSize: 16 }}>
                    Dr. Nguyen Thi Thuy Vy
                  </HeaderText>
                  <SubText
                    style={{ color: "rgba(0, 0, 0, 0.50)", fontSize: 14 }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {message.latestMessage.message}
                  </SubText>
                </View>
                <SubText style={{ color: "rgba(0, 0, 0, 0.50)", fontSize: 12 }}>
                  08 : 25
                </SubText>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default ListChatBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 25,
  },
  messageItem: {
    flexDirection: "row",
    gap: 15,
    paddingVertical: 10,
    alignItems: "center",
    borderColor: "#8CC840",
    borderBottomWidth: 1,
  },
  message: {
    flex: 1,
    flexDirection: "column",
    gap: 5,
    // backgroundColor: "#FD0000",
  },
  avatar: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 30,
    shadowOffset: {
      width: 1,
      height: -1,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
