import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
  TextInput,
  RefreshControl,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import HeaderText from "../../components/HeaderText";
import SubText from "../../components/SubText";
import { ScrollView } from "react-native-gesture-handler";
import Comment from "../../components/Comment";
import Post from "../../components/Post";
import BottomSheetModal from "@gorhom/bottom-sheet";
import NewPostForm from "../../components/NewPostForm";
import {
  DeletePost,
  getAllPost,
  getAllPostByTag,
  getPost,
  UndoDeletePost,
} from "../../Services/CommunityApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
const CommunityScreen = () => {
  const [activeTag, setActiveTag] = useState(0);
  const [dataTag, setDataTag] = useState();
  const [activePost, setActivePost] = useState();
  const [dataNewPost, setDataNewPost] = useState();
  const [flag, setFlag] = useState(false);
  const bottomSheetRef = useRef(null);
  const [userId, setUserId] = useState();
  const [postData, setPostData] = useState();
  const [hashtagName, setHashtagName] = useState(dataTag && dataTag);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const bottomSheetRefInf = useRef(null);
  const navigation = useNavigation();

  const data = [
    { label: "Delete", action: handleDelete },
    { label: "Update", action: handleUpdate },
    { label: "Cancel", action: handleClose },
  ];

  const handleDelete = async () => {
    await DeletePost(activePost);
    setFlag(!flag);
    bottomSheetRefInf.current.close();
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      setActivePost(null);
    }, 3000);
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
    let data;
    if (activeTag == 0) {
      if (dataTag) {
        setHashtagName(dataTag);
        data = await getAllPostByTag(dataTag.id);
      } else {
        setHashtagName();
        data = await getAllPost();
      }
    } else {
      data = await getPost(activeTag);
    }
    setPostData(data);
  };
  const onRefresh = () => {
    retrievePostData();
  };
  const searchByTag = async () => {
    const response = await getAllPostByTag();
  };

  useEffect(() => {
    AsyncStorage.getItem("userProfile").then((value) => {
      setUserId(JSON.parse(value).userProfile.user.id);
    });
    retrievePostData();
  }, [activeTag, flag, dataTag]);
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
          onPress={() => {
            setDataTag();
            setActiveTag(1);
          }}
        >
          <HeaderText style={styles.categoryName}>Q&A</HeaderText>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTag === 3 ? styles.categoryActive : styles.category}
          onPress={() => {
            setActiveTag(3);
          }}
        >
          <HeaderText style={styles.categoryName}>Experience</HeaderText>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTag === 2 ? styles.categoryActive : styles.category}
          onPress={() => {
            setActiveTag(2);
          }}
        >
          <HeaderText style={styles.categoryName}>Sharing</HeaderText>
        </TouchableOpacity>
      </View>
      <View style={styles.actionContainer}>
        <View style={{ flex: 1 }}>
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
        </View>
        {hashtagName && (
          <View style={styles.hashtagBtnContainer}>
            <SubText style={{ fontSize: 16 }}>#{hashtagName.name}</SubText>
            <TouchableOpacity
              style={styles.hashtagDeletebtn}
              onPress={() => {
                setDataTag();
              }}
            >
              <Text style={styles.deleteText}>✖️</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ flex: 1 }}></View>
      </View>

      <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} />}>
        <View style={styles.contentContainer}>
          {postData?.posts?.map((post, index) => (
            <Post
              post={post}
              key={index}
              userId={userId}
              setVisible={setVisible}
              setActivePost={setActivePost}
              setDataNewPost={setDataNewPost}
              setFlag={setFlag}
              flag={flag}
              activeTag={activeTag}
              setHashtagName={setHashtagName}
              setActiveTag={setActiveTag}
              setDataTag={setDataTag}
            ></Post>
          ))}
        </View>
      </ScrollView>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Post deleted. Undo?</Text>
            <TouchableOpacity
              style={styles.undoButton}
              onPress={() => handleUndo()}
            >
              <Text>Undo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    alignItems: "center",
    gap: 25,
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
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 90,
  },
  modalView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8CC840",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 20,
  },
  undoButton: {
    backgroundColor: "#FDFDFD",
    padding: 10,
    borderRadius: 10,
  },

  hashtagBtnContainer: {
    flexDirection: "row",
    backgroundColor: "#8CC84090",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 5,
  },
  hashtagDeletebtn: {
    backgroundColor: "rgba(26, 26, 26, 0.20)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    fontSize: 12,
  },
});
