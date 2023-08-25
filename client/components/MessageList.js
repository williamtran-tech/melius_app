import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";

const MessageList = ({ messages, type }) => {
  return (
    <FlatList
      inverted
      data={messages}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View
          style={
            item.role == "system"
              ? styles.messageContainerChatbot
              : styles.messageContainerUser
          }
        >
          <Image
            style={styles.avatar}
            source={
              item.role == "system"
                ? require("../assets/images/AvatarChatbot.png")
                : require("../assets/images/Avatar.png")
            }
          />
          <View
            style={
              type === "expert" ? stylesExpert[item.role] : styles[item.role]
            }
          >
            <Text>{item.message}</Text>
          </View>
        </View>
      )}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
    />

    // <View style={styles.messageContainer}>
    //   <ScrollView alwaysBounce>
    //     <View style={{ flex: 1, flexDirection: "column-reverse" }}>
    //       {messages.map((message, index) => (
    //         <View
    //           style={
    //             message.role == "system"
    //               ? styles.messageContainerChatbot
    //               : styles.messageContainerUser
    //           }
    //         >
    //           <Image
    //             style={styles.avatar}
    //             source={
    //               message.role == "system"
    //                 ? require("../assets/images/AvatarChatbot.png")
    //                 : require("../assets/images/Avatar.png")
    //             }
    //           />
    //           <View
    //             style={
    //               type === "expert"
    //                 ? stylesExpert[message.role]
    //                 : styles[message.role]
    //             }
    //           >
    //             <Text>{message.message}</Text>
    //           </View>
    //         </View>
    //       ))}
    //     </View>
    //   </ScrollView>
    // </View>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: "#000",
    flex: 1,
  },
  messageContainerChatbot: {
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  messageContainerUser: {
    borderRadius: 10,
    padding: 15,
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    gap: 10,
  },

  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: "rgba(26, 26, 26, 0.20)",
    borderWidth: 1,
  },
  system: {
    backgroundColor: "#FFF",
    shadowOffset: {
      width: 1,
      height: -1,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 15,
    borderRadius: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    flexShrink: 1,
  },
  user: {
    flexDirection: "row",
    flexShrink: 1,
    backgroundColor: "#FF9600",
    borderRadius: 10,
    shadowOffset: {
      width: -1,
      height: -1,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 15,
  },
});
const stylesExpert = StyleSheet.create({
  system: {
    backgroundColor: "#FFF",
    shadowOffset: {
      width: 1,
      height: -1,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 15,
    borderRadius: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    flexShrink: 1,
  },
  user: {
    flexDirection: "row",
    flexShrink: 1,
    backgroundColor: "#8CC840",
    borderRadius: 10,
    shadowOffset: {
      width: -1,
      height: -1,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 15,
  },
});
