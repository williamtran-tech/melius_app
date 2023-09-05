import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useRef } from "react";
import HeaderText from "./HeaderText";
import SubText from "./SubText";

const Comment = ({ handleReplyPress, scrollToComment, comment }) => {
  const [active, setActive] = useState();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {comment &&
          comment.map((item, index) => (
            <View style={styles.messagecontainer} key={index}>
              <Image
                source={require("../assets/images/doctor.png")}
                style={styles.avatar}
              />
              <View>
                <View
                  style={
                    active === item.id
                      ? {
                          ...styles.message,
                          backgroundColor: "rgba(26, 26, 26, 0.50)",
                        }
                      : styles.message
                  }
                >
                  <HeaderText>Tam Vo</HeaderText>
                  <SubText>
                    asofjioasdhfi aopwedfjioa asofjioasdhfi aopwedfjioa
                  </SubText>
                </View>
                <View style={styles.actionConatiner}>
                  <TouchableOpacity>
                    <HeaderText style={styles.actionName}>Like</HeaderText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setActive(item.id);
                      handleReplyPress();
                      scrollToComment(item.id);
                      console.log(item.id);
                    }}
                  >
                    <HeaderText style={styles.actionName}>Reply</HeaderText>
                  </TouchableOpacity>
                </View>
              </View>
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
    paddingHorizontal: 10,
  },
  actionName: {
    fontSize: 12,
    color: "rgba(26, 26, 26, 0.60)",
  },
});
