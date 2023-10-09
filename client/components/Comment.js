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
import {
  CommentPost,
  deleteComment,
  undoDeleteAndReact,
  updateComment,
} from "../Services/CommunityApi";

const Comment = ({
  handleReplyPress,
  comments,
  setActiveComment,
  activeComment,
  setFlag,
  flag,
  userId,
}) => {
  const [actionCommnment, setActionComment] = useState();
  const [updateCommnment, setUpdateComment] = useState();
  //for comment update content
  const [comment, setComment] = useState();
  const handleUpdateCommment = async () => {
    const response = await updateComment(updateCommnment, comment);
    setActionComment();
    setUpdateComment();
    setComment();
    setFlag(!flag);
  };
  const handleDeleteCommment = async () => {
    const response = await deleteComment(actionCommnment);
    setActionComment();
    setUpdateComment();
    setComment();
    setFlag(!flag);
  };
  const handleLikeComment = async (id) => {
    const response = await undoDeleteAndReact(id, true);

    setFlag(!flag);
  };
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
            <View key={index}>
              <View style={styles.messagecontainer}>
                <Image
                  source={
                    item?.user?.img
                      ? { uri: item.user.img }
                      : require("../assets/images/Avatar.png")
                  }
                  style={styles.avatar}
                />
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={
                        activeComment === item.id
                          ? {
                              ...styles.message,
                              backgroundColor: "rgba(26, 26, 26, 0.50)",
                            }
                          : styles.message
                      }
                      disabled={userId !== item.user.id}
                      onLongPress={() => {
                        setActionComment(item.id);
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <HeaderText>{item.user.fullName}</HeaderText>
                        <SubText style={{ fontSize: 12 }}>
                          {formatTimeElapsed(item.createdAt)}
                        </SubText>
                      </View>
                      {updateCommnment == item.id ? (
                        <View>
                          <TextInput
                            style={styles.input}
                            value={comment}
                            onChangeText={(value) => setComment(value)}
                            multiline={true}
                          />
                          <View style={{ flexDirection: "row", gap: 15 }}>
                            <TouchableOpacity
                              onPress={() => {
                                handleUpdateCommment();
                              }}
                              style={{
                                backgroundColor: "#8CC840",
                                ...styles.action,
                              }}
                            >
                              <SubText>Update</SubText>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                backgroundColor: "rgba(26, 26, 26, 0.50)",
                                ...styles.action,
                              }}
                              onPress={() => {
                                setActionComment();
                                setUpdateComment();
                                setComment();
                              }}
                            >
                              <SubText>Cancel</SubText>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : (
                        <SubText>{item?.comment}</SubText>
                      )}
                    </TouchableOpacity>
                    {actionCommnment == item.id && (
                      <View style={{ flexDirection: "row", gap: 15 }}>
                        <TouchableOpacity
                          onPress={() => {
                            setComment(item.comment);
                            setUpdateComment(item.id);
                            setActionComment();
                          }}
                          style={{
                            backgroundColor: "#8CC840",
                            ...styles.action,
                          }}
                        >
                          <SubText>Update</SubText>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#FF9600",
                            ...styles.action,
                          }}
                          onPress={() => handleDeleteCommment()}
                        >
                          <SubText>Delete</SubText>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "rgba(26, 26, 26, 0.50)",
                            ...styles.action,
                          }}
                          onPress={() => {
                            setActionComment();
                            setUpdateComment();
                            setComment();
                          }}
                        >
                          <SubText>Cancel</SubText>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                  <View style={styles.actionConatiner}>
                    <TouchableOpacity
                      onPress={() => {
                        handleLikeComment(item.id);
                      }}
                    >
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
                      reply?.user?.img
                        ? { uri: reply.user.img }
                        : require("../assets/images/Avatar.png")
                    }
                    style={styles.avatar}
                  />
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        style={
                          activeComment === reply.id
                            ? {
                                ...styles.message,
                                backgroundColor: "rgba(26, 26, 26, 0.50)",
                              }
                            : styles.message
                        }
                        onLongPress={() => setActionComment(reply.id)}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <HeaderText>{reply.user.fullName}</HeaderText>
                          <SubText style={{ fontSize: 12 }}>
                            {formatTimeElapsed(reply.createdAt)}
                          </SubText>
                        </View>
                        {updateCommnment == reply.id ? (
                          <View>
                            <TextInput
                              style={styles.input}
                              value={comment}
                              onChangeText={(value) => setComment(value)}
                              multiline={true}
                            />
                            <View style={{ flexDirection: "row", gap: 15 }}>
                              <TouchableOpacity
                                onPress={() => {
                                  handleUpdateCommment();
                                }}
                                style={{
                                  backgroundColor: "#8CC840",
                                  ...styles.action,
                                }}
                              >
                                <SubText>Update</SubText>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={{
                                  backgroundColor: "rgba(26, 26, 26, 0.50)",
                                  ...styles.action,
                                }}
                                onPress={() => {
                                  setActionComment();
                                  setUpdateComment();
                                  setComment();
                                }}
                              >
                                <SubText>Cancel</SubText>
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : (
                          <SubText>{reply?.comment}</SubText>
                        )}
                      </TouchableOpacity>
                      {actionCommnment == reply.id && (
                        <View style={{ flexDirection: "row", gap: 15 }}>
                          <TouchableOpacity
                            onPress={() => {
                              setComment(reply.comment);
                              setUpdateComment(reply.id);
                              setActionComment();
                            }}
                            style={{
                              backgroundColor: "#8CC840",
                              ...styles.action,
                            }}
                          >
                            <SubText>Update</SubText>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#FF9600",
                              ...styles.action,
                            }}
                            onPress={() => handleDeleteCommment()}
                          >
                            <SubText>Delete</SubText>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "rgba(26, 26, 26, 0.50)",
                              ...styles.action,
                            }}
                            onPress={() => {
                              setActionComment();
                              setUpdateComment();
                              setComment();
                            }}
                          >
                            <SubText>Cancel</SubText>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                    <View style={styles.actionConatiner}>
                      <TouchableOpacity
                        onPress={() => {
                          handleLikeComment(reply.id);
                        }}
                      >
                        <View style={styles.interactContainer}>
                          <Image
                            style={styles.interact}
                            source={require("../assets/icon/IconLike.png")}
                          ></Image>
                          <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                            {reply.likes}
                          </SubText>
                        </View>
                      </TouchableOpacity>
                      {/* <TouchableOpacity
                        onPress={() => {
                          setActiveComment(reply.id);
                          handleReplyPress();
                        }}
                      >
                        <HeaderText style={styles.actionName}>Reply</HeaderText>
                      </TouchableOpacity> */}
                    </View>
                  </View>
                </View>
              ))}
            </View>
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
    // flexBasis: "90%",
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
  action: {
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 20,

    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#FDFDFD",
    padding: 5,
    borderRadius: 15,
  },
});
