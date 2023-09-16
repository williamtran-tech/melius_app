import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import HeaderText from "../../components/HeaderText";
import SubText from "../../components/SubText";
import { ScrollView } from "react-native-gesture-handler";
import Comment from "../../components/Comment";
import Post from "../../components/Post";
import BottomSheetModal from "@gorhom/bottom-sheet";
import NewPostForm from "../../components/NewPostForm";
import { DeletePost, getPost } from "../../Services/CommunityApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
const CommunityScreen = () => {
  const [activeTag, setActiveTag] = useState(2);
  const [activePost, setActivePost] = useState();
  const [flag, setFlag] = useState(false);
  const bottomSheetRef = useRef(null);
  const [userId, setUserId] = useState();
  const [postData, setPostData] = useState();
  const [visible, setVisible] = useState(false);
  const bottomSheetRefInf = useRef(null);
  const data = [
    { label: "Delete", action: handleDelete },
    { label: "Update", action: handleUpdate },
    { label: "Cancel", action: handleClose },
  ];

  const handleDelete = async () => {
    await DeletePost(activePost);
    setFlag(!flag);
    bottomSheetRefInf.current.close();
  };

  const handleUpdate = () => {
    bottomSheetRefInf.current.close();
  };

  const handleClose = () => {
    bottomSheetRefInf.current.close();
  };
  const handleNewPostPress = () => {
    console.log(bottomSheetRef.current); // Add this line

    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  };
  const handleClosePress = () => bottomSheetRef.current.close();
  const retrievePostData = async () => {
    const data = await getPost(activeTag);
    setPostData(data);
  };
  useEffect(() => {
    AsyncStorage.getItem("userProfile").then((value) => {
      setUserId(JSON.parse(value).userProfile.user.id);
    });
    retrievePostData();
  }, [activeTag, flag]);
  return (
    // <TouchableWithoutFeedback
    //   onPress={() => {
    //     if (visible) {
    //       handleClose();
    //     }
    //   }}
    // >
    <View style={{ flex: 1 }}>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={activeTag === 0 ? styles.categoryActive : styles.category}
          onPress={() => setActiveTag(0)}
        >
          <HeaderText style={styles.categoryName}>All</HeaderText>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTag === 1 ? styles.categoryActive : styles.category}
          onPress={() => setActiveTag(1)}
        >
          <HeaderText style={styles.categoryName}>Q&A</HeaderText>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTag === 3 ? styles.categoryActive : styles.category}
          onPress={() => setActiveTag(3)}
        >
          <HeaderText style={styles.categoryName}>Experience</HeaderText>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTag === 2 ? styles.categoryActive : styles.category}
          onPress={() => setActiveTag(2)}
        >
          <HeaderText style={styles.categoryName}>Sharing</HeaderText>
        </TouchableOpacity>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            handleNewPostPress();
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#518B1A",
            }}
          >
            +
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setVisible(true)}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#518B1A",
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.contentContainer}>
          {postData?.posts?.map((post, index) => (
            <Post
              post={post}
              key={index}
              userId={userId}
              setVisible={setVisible}
              setActivePost={setActivePost}
            ></Post>
          ))}
        </View>
      </ScrollView>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={["85%"]} // Define your snap points here
        index={-1} // The initial snap point (0 means the first snap point)
        enablePanDownToClose
      >
        <NewPostForm></NewPostForm>
      </BottomSheetModal>

      <BottomSheetModal
        ref={bottomSheetRefInf}
        enablePanDownToClose
        snapPoints={["30%"]}
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
          <TouchableOpacity onPress={() => handleDelete()}>
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
    // </TouchableWithoutFeedback>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    paddingHorizontal: 25,
    marginTop: 20,
  },
  categoryActive: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "rgb(255, 150, 0)",
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: "#000",
    shadowRadius: 1,
    shadowOpacity: 0.2,
  },
  category: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "rgba(26, 26, 26, 0.20)",
    borderRadius: 20,
  },
  categoryName: {
    color: "#FDFDFD",
    fontSize: 12,
  },
  addBtn: {
    height: 30,
    width: 30,
    backgroundColor: "#8CC84033",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginVertical: 10,
  },
  postContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FDFDFD",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    borderRadius: 5,
  },

  avatar: {
    height: 32,
    width: 32,
    resizeMode: "cover",
    borderRadius: 16,
  },
  avatarConatiner: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  tag: {
    color: "#FF9600",
    fontSize: 12,
  },
  headerPost: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hashTag: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
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
  contentContainer: {
    paddingHorizontal: 25,
  },
});
