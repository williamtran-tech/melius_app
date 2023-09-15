import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Post from "../../components/Post";
import HeaderText from "../../components/HeaderText";
import { set } from "react-native-reanimated";
import { GetPostDetail } from "../../Services/CommunityApi";

const PostDetail = ({ route }) => {
  const { data } = route.params;
  console.log(data);
  const [post, setPost] = useState();
  const [message, setMessage] = useState();
  const textInputRef = useRef(null);

  const handleReplyPress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const handleInputChange = (text) => {
    setMessage(text);
  };
  const scrollViewRef = useRef(null);
  const [comment, setComment] = useState([
    {
      id: 1,
      comment: "hello",
      timeStamp: "2023-08-23T18:05:45.000Z",
    },
    {
      id: 2,
      comment: "hi",
      timeStamp: "2023-08-23T18:06:45.000Z",
    },
    {
      id: 3,
      comment: "hi",
      timeStamp: "2023-08-23T18:06:45.000Z",
    },
    {
      id: 4,
      comment: "hi",
      timeStamp: "2023-08-23T18:06:45.000Z",
    },
    {
      id: 5,
      comment: "hi",
      timeStamp: "2023-08-23T18:06:45.000Z",
    },
    {
      id: 6,
      comment: "hi",
      timeStamp: "2023-08-23T18:06:45.000Z",
    },
    {
      id: 7,
      comment: "hi",
      timeStamp: "2023-08-23T18:06:45.000Z",
    },
    {
      id: 8,
      comment: "hi",
      timeStamp: "2023-08-23T18:06:45.000Z",
    },
    {
      id: 9,
      comment: "hi",
      timeStamp: "2023-08-23T18:06:45.000Z",
    },
    {
      id: 10,
      comment: "hi",
      timeStamp: "2023-08-23T18:06:45.000Z",
    },
    {
      id: 11,
      comment: "hi",
      timeStamp: "2023-08-23T18:06:45.000Z",
    },
    {
      id: 12,
      comment: "hi",
      timeStamp: "2023-08-23T18:06:45.000Z",
    },
    {
      id: 13,
      comment: "hi",
      timeStamp: "2023-08-23T18:06:45.000Z",
    },
  ]);
  const scrollToComment = (commentId) => {
    const commentIndex = comment.findIndex((item) => item.id === commentId);

    if (commentIndex === -1) {
      return;
    }

    const commentHeight = 100; // Adjust the height based on your comment layout
    const keyboardHeight = Platform.OS === "ios" ? 300 : 150; // Adjust as needed

    const scrollPosition =
      commentIndex * commentHeight - keyboardHeight + commentHeight;

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: scrollPosition, animated: true });
    }
  };
  const retrievePostData = async () => {
    const dataPost = await GetPostDetail(data);
    console.log(dataPost);
    setPost(dataPost.post);
  };
  useEffect(() => {
    retrievePostData();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <ScrollView ref={scrollViewRef}>
          {post && (
            <Post
              focus={true}
              post={post}
              handleReplyPress={handleReplyPress}
              scrollToComment={scrollToComment}
              comment={comment}
            ></Post>
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            ref={textInputRef}
            style={styles.input}
            placeholder="Comment here "
            value={message}
            onChangeText={handleInputChange}
          />
          {message && (
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={require("../../assets/icon/IconSend.png")}
                style={styles.sendIcon}
              ></Image>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#FDFDFD",
  },
  inputContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40, // Adjust the height as needed
    paddingHorizontal: 10,
    borderRadius: 20,
    color: "black", // Default text color
    backgroundColor: "rgba(26, 26, 26, 0.10)",
    marginBottom: 5,
  },
  //   focusedInput: {
  //     borderColor: "blue", // Border color when focused
  //     color: "blue", // Text color when focused
  //   },
  sendIcon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
});
