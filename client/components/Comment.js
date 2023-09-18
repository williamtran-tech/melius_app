import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import HeaderText from "./HeaderText";
import SubText from "./SubText";
import { formatTimeElapsed } from "../Services/FormatTimeElapsed";
import { CommentPost } from "../Services/CommunityApi";

const Comment = ({
  handleReplyPress,
  comments,
  setActiveComment,
  activeComment,
}) => {
  useEffect(() => {
    // Add a keyboard dismiss event listener

    const keyboardDismissListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setActiveComment("");
      }
    );

    // Clean up the event listener when the component unmounts
    return () => {
      keyboardDismissListener.remove();
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {comments &&
          comments.map((item, index) => (
            <>
              <View style={styles.messagecontainer} key={index}>
                <Image
                  source={
                    item.isAnonymous ? { uri: "" } : { uri: item.user.img }
                  }
                  style={styles.avatar}
                />
                <View>
                  <View
                    style={
                      activeComment === item.id
                        ? {
                            ...styles.message,
                            backgroundColor: "rgba(26, 26, 26, 0.50)",
                          }
                        : styles.message
                    }
                  >
                    <HeaderText>{item.user.fullName}</HeaderText>
                    <SubText>{item?.comment}</SubText>
                  </View>
                  <View style={styles.actionConatiner}>
                    <TouchableOpacity>
                      <View style={styles.interactContainer}>
                        <Image
                          style={styles.interact}
                          source={require("../assets/icon/IconLike.png")}
                        ></Image>
                        <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                          {item.likes}
                        </SubText>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setActiveComment(item.id);
                        handleReplyPress();
                      }}
                    >
                      <HeaderText style={styles.actionName}>Reply</HeaderText>
                    </TouchableOpacity>
                    <SubText>{formatTimeElapsed(item.createdAt)}</SubText>
                  </View>
                </View>
              </View>
              {item?.replies.map((reply, indexx) => (
                <View
                  style={{
                    paddingLeft: 50,
                    paddingBottom: 10,
                    ...styles.messagecontainer,
                  }}
                  key={indexx}
                >
                  <Image
                    source={
                      reply.isAnonymous ? { uri: "" } : { uri: reply.user.img }
                    }
                    style={styles.avatar}
                  />
                  <View>
                    <View
                      style={
                        activeComment === reply.id
                          ? {
                              ...styles.message,
                              backgroundColor: "rgba(26, 26, 26, 0.50)",
                            }
                          : styles.message
                      }
                    >
                      <HeaderText>{reply.user.fullName}</HeaderText>
                      <SubText>{reply?.comment}</SubText>
                    </View>
                    <View style={styles.actionConatiner}>
                      <TouchableOpacity>
                        <View style={styles.interactContainer}>
                          <Image
                            style={styles.interact}
                            source={require("../assets/icon/IconLike.png")}
                          ></Image>
                          <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                            {item.likes}
                          </SubText>
                        </View>
                      </TouchableOpacity>

                      <SubText>{formatTimeElapsed(item.createdAt)}</SubText>
                    </View>
                  </View>
                </View>
              ))}
            </>
          ))}
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    borderTopColor: "rgba(26, 26, 26, 0.30)",
    borderTopWidth: 1,
  },
  avatar: {
    marginTop: 5,
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: "cover",
  },
  messagecontainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
    gap: 10,
  },
  message: {
    flexShrink: 1,
    flexDirection: "column",
    backgroundColor: "rgba(26, 26, 26, 0.20)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#8f8f8f",
    padding: 5,
    borderRadius: 20,
  },
  actionConatiner: {
    flexDirection: "row",
    gap: 20,
    // justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  actionName: {
    fontSize: 12,
    color: "rgba(26, 26, 26, 0.60)",
  },
  interact: {
    width: 21,
    height: 15,
    resizeMode: "contain",
  },
  interactContainer: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
});
