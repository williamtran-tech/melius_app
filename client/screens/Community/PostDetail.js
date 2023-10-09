import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Post from "../../components/Post";
import HeaderText from "../../components/HeaderText";
import { set } from "react-native-reanimated";
import {
  CommentPost,
  DeletePost,
  GetPostDetail,
} from "../../Services/CommunityApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheetModal from "@gorhom/bottom-sheet";
import NewPostForm from "../../components/NewPostForm";
import SubText from "../../components/SubText";
import { useNavigation } from "@react-navigation/native";

const PostDetail = ({ route }) => {
  const { data } = route.params;
  const [post, setPost] = useState();
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState();
  const textInputRef = useRef(null);
  const [activeComment, setActiveComment] = useState();
  const [activePost, setActivePost] = useState();
  const [dataNewPost, setDataNewPost] = useState();
  const bottomSheetRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const bottomSheetRefInf = useRef(null);
  const navigation = useNavigation();
  const handleReplyPress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  // const scrollViewRef = useRef(null);

  // const scrollToComment = (commentId) => {
  //   const commentIndex = comment.findIndex((item) => item.id === commentId);

  //   if (commentIndex === -1) {
  //     return;
  //   }

  //   const commentHeight = 100; // Adjust the height based on your comment layout
  //   const keyboardHeight = Platform.OS === "ios" ? 300 : 150; // Adjust as needed

  //   const scrollPosition =
  //     commentIndex * commentHeight - keyboardHeight + commentHeight;

  //   if (scrollViewRef.current) {
  //     scrollViewRef.current.scrollTo({ y: scrollPosition, animated: true });
  //   }
  // };
  const handleDelete = async () => {
    await DeletePost(activePost);
    bottomSheetRefInf.current.close();
    // setModalVisible(true);
    setTimeout(() => {
      // setModalVisible(false);
      setActivePost(null);
    }, 3000);
    navigation.goBack();
  };

  const handleUndo = async () => {
    await UndoDeletePost(activePost);
    setModalVisible(false);
    setActivePost(null);
    setFlag(!flag);
  };
  const handleUpdate = async () => {
    // await UndoDeletePost(activePost);
    // setFlag(!flag);
    bottomSheetRefInf.current.close();
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  };

  const handleClose = () => {
    bottomSheetRefInf.current.close();
  };
  const handleCloseNewPost = () => {
    bottomSheetRef.current.close();
  };
  const handleNewPostPress = () => {
    // console.log(bottomSheetRef.current);
    setDataNewPost();
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  };
  const handleClosePress = () => bottomSheetRef.current.close();
  const retrievePostData = async () => {
    const dataPost = await GetPostDetail(data);
    console.log(dataPost);
    setPost(dataPost.post);
  };
  const [content, setContent] = useState();
  const handleComment = async () => {
    const response = await CommentPost(post.id, content, activeComment);
    Keyboard.dismiss();
    setContent("");
    setFlag(!flag);
  };
  const [userId, setUserId] = useState();
  useEffect(() => {
    AsyncStorage.getItem("userProfile").then((value) => {
      setUserId(JSON.parse(value).userProfile.user.id);
    });
    retrievePostData();
  }, [flag]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <ScrollView>
          {post && (
            <Post
              focus={true}
              post={post}
              handleReplyPress={handleReplyPress}
              setActiveComment={setActiveComment}
              activeComment={activeComment}
              setDataNewPost={setDataNewPost}
              setVisible={setVisible}
              setActivePost={setActivePost}
              setFlag={setFlag}
              flag={flag}
              userId={userId}
            ></Post>
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            ref={textInputRef}
            style={styles.input}
            placeholder="Comment here "
            value={content}
            onChangeText={(value) => setContent(value)}
          />
          {content && (
            <TouchableOpacity
              onPress={() => {
                handleComment();
              }}
            >
              <Image
                source={require("../../assets/icon/IconSend.png")}
                style={styles.sendIcon}
              ></Image>
            </TouchableOpacity>
          )}
        </View>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={["100%"]} // Define your snap points here
          index={-1} // The initial snap point (0 means the first snap point)
          enablePanDownToClose
        >
          <NewPostForm
            dataNewPost={dataNewPost}
            flag={flag}
            setFlag={setFlag}
            handleCloseNewPost={handleCloseNewPost}
          ></NewPostForm>
        </BottomSheetModal>

        <BottomSheetModal
          ref={bottomSheetRefInf}
          enablePanDownToClose
          snapPoints={["25%"]}
          index={visible ? 0 : -1}
          onChange={(index) => {
            if (index === -1) setVisible(false);
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity onPress={() => handleUpdate()}>
              <SubText>Update</SubText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete()}>
              <SubText>Delete</SubText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete()}>
              <SubText>Cancel</SubText>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
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
