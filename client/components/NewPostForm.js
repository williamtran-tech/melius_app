import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderText from "./HeaderText";
import RNPickerSelect from "react-native-picker-select";
import SubText from "./SubText";
import { ImagePicker } from "expo-image-multiple-picker";
import { createPost, deleteImage, updatePost } from "../Services/CommunityApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SwitchSelector from "react-native-switch-selector";

const NewPostForm = ({
  flag,
  setFlag,
  handleCloseNewPost,
  dataNewPost,
  activeTag,
}) => {
  const [topic, setTopic] = useState(activeTag);
  const [content, setContent] = useState();
  const [isAnonymous, setisAnonymous] = useState(false);
  const [hashtag, setHashtag] = useState();
  const [hashtagList, setHashtagList] = useState();
  const [showHashtagInput, setShowHashtagInput] = useState(false);
  const [userInf, setuserInf] = useState();
  //for image in server
  const [deleteImageId, setDeleteImageId] = useState([]);
  const handleChange = (value) => {
    console.log(value);
    setTopic(value);
  };

  const [imageBrowser, setImageBrowser] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const openImagePicker = () => {
    setImageBrowser(true);
  };
  const pickerItems = [
    { label: "Q&A", value: 1 },
    { label: "Experience", value: 3 },
    { label: "Sharing", value: 2 },
  ];
  const handleSpaceKeyPress = (event) => {
    // Detect space key press (key code 32)
    if (event.nativeEvent.key === " " || event.nativeEvent.key === "Enter") {
      saveHashtag();
      setShowHashtagInput(false);
    }
  };
  const saveHashtag = () => {
    if (hashtag && hashtag.trim() !== "") {
      setHashtagList(hashtagList ? [...hashtagList, hashtag] : [hashtag]);
      setHashtag(""); // Clear the input field after saving
    }
  };
  const handleChangeHashtag = (value) => {
    console.log(value);
    setHashtag(value);
    console.log(hashtagList);
  };
  const deleteHashtag = (index) => {
    const updatedHashtags = [...hashtagList];
    updatedHashtags.splice(index, 1); // Remove the hashtag at the specified index
    setHashtagList(updatedHashtags);
  };
  const handlePost = async () => {
    try {
      const response = await createPost(
        content,
        isAnonymous,
        topic,
        hashtagList,
        imageUrls
      );
      Keyboard.dismiss();
      setFlag(!flag);
      handleCloseNewPost();
      setImageUrls();
      setHashtagList();
      setTopic(activeTag);
    } catch (error) {
      console.log(error.message);
    }

    // console.log(response.data);
  };
  const handleDeleteImage = async () => {
    try {
      const response = await deleteImage(dataNewPost.id, deleteImageId);
    } catch (error) {}
  };
  const handleUpdate = async () => {
    try {
      if (deleteImageId.length > 0) {
        const responseDelete = await handleDeleteImage();
      }
      const response = await updatePost(
        dataNewPost.id,
        content,
        isAnonymous,
        topic,
        hashtagList,
        imageUrls,
        dataNewPost.images.map((image) => {
          return { uri: image.imagePath, id: image.id, isOriginal: true };
        })
      );
      setFlag(!flag);
      handleCloseNewPost();
      setImageUrls();
      setHashtagList();
      setTopic();
      setDeleteImageId([]);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const HandleDeleteImage = (index) => {
    console.log(index);
    const updatedImageUrls = [...imageUrls];

    // Remove the element at the specified index using splice
    updatedImageUrls.splice(index, 1);

    // Update the state with the modified array
    setImageUrls(updatedImageUrls);
  };
  const getAvatarUrl = async () => {
    const userProfile = await AsyncStorage.getItem("userProfile");
    setuserInf(JSON.parse(userProfile).userProfile.user);
  };
  const changeAnonymous = (value) => {
    setisAnonymous(value);
    console.log(value);
  };
  useEffect(() => {
    getAvatarUrl();
    // (async () => {
    //   const { status } =
    //     await ImagePicker.requestMediaLibraryPermissionsAsync();
    //   if (status !== "granted") {
    //     console.log("Permission to access images denied.");
    //   }
    // })();
    setContent(dataNewPost && dataNewPost.content);
    setHashtagList(dataNewPost && dataNewPost.tags.map((tag) => tag.name));
    setisAnonymous(dataNewPost && dataNewPost.isAnonymous);
    setImageUrls(
      dataNewPost &&
        dataNewPost.images.map((image) => {
          return { uri: image.imagePath, id: image.id, isOriginal: true };
        })
    );
    setTopic(activeTag);
    console.log("activeTag", dataNewPost);
  }, [dataNewPost, activeTag]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <View style={{ flex: 1 }}>
            <SwitchSelector
              initial={isAnonymous == true ? 1 : 0}
              onPress={(value) => {
                changeAnonymous(value);
              }}
              textColor="#000"
              selectedColor="#518B1A"
              buttonColor="rgba(140, 200, 64, 0.2)"
              borderColor="rgba(140, 200, 64, 0.2)"
              fontSize={14}
              height={30}
              hasPadding
              options={[
                { label: "✓⃝", value: false },
                { label: "❓ ", value: true },
              ]}
            />
          </View>
          <View style={{ flex: 2 }}>
            <HeaderText style={styles.centeredText}>
              {dataNewPost ? "Update Post" : "New Post"}
            </HeaderText>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity
              style={styles.postButton}
              onPress={() => (dataNewPost ? handleUpdate() : handlePost())}
            >
              <Text style={styles.postText}>
                {dataNewPost ? "Save" : "Post"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingHorizontal: 25, paddingTop: 10 }}>
          <View style={styles.headerPost}>
            <View style={styles.avatarConatiner}>
              <Image
                style={styles.avatar}
                source={
                  userInf
                    ? { uri: userInf.img }
                    : require("../assets/images/doctor.png")
                }
              ></Image>
              <HeaderText>{userInf?.fullName}</HeaderText>
            </View>
            <View style={styles.actionContainer}>
              <RNPickerSelect
                value={topic ? topic : 0}
                onValueChange={(value) => handleChange(value)}
                placeholder={{
                  label: "Choose topic",
                  color: "#8C8C8C",
                  value: 0,
                  fontSize: 6,
                }}
                items={pickerItems}
                style={picker}
              />
              <Button title="Add Images" onPress={() => openImagePicker()} />
            </View>
          </View>
          <View>
            <View>
              <TextInput
                value={content}
                onChangeText={(value) => setContent(value)}
                placeholder="Type here..."
                placeholderTextColor="#8b9cb5"
                multiline={true}
              ></TextInput>
            </View>
            <View style={styles.hashTagContainer}>
              {hashtagList &&
                hashtagList.map((hashtag, index) => (
                  <View style={styles.hashtagBtnContainer} key={index}>
                    <SubText>#{hashtag}</SubText>
                    <TouchableOpacity
                      style={styles.hashtagDeletebtn}
                      onPress={() => deleteHashtag(index)}
                    >
                      <Text style={styles.deleteText}>✖️</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              {showHashtagInput ? (
                <TextInput
                  placeholder="hashtag"
                  placeholderTextColor="#8b9cb5"
                  multiline={true}
                  value={hashtag}
                  onChangeText={handleChangeHashtag}
                  onBlur={() => setShowHashtagInput(false)}
                  onKeyPress={handleSpaceKeyPress} // Detect space key press
                  autoFocus
                ></TextInput>
              ) : (
                <TouchableOpacity
                  onPress={() => setShowHashtagInput(true)}
                  style={styles.addBtn}
                >
                  <Text style={{ color: "#FDFDFD" }}>➕ Hashtag</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        {imageUrls && (
          <View style={styles.imagesContainer}>
            {imageUrls?.map((image, index) => (
              <View
                style={[
                  styles.imageContainer,
                  imageUrls.length == 1 && { flexBasis: "100%" },
                  imageUrls.length == 2 && { flexBasis: "49%" },
                ]}
                key={index}
              >
                <Image source={{ uri: image.uri }} style={styles.image} />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    alignSelf: "flex-end",
                    marginTop: 15,
                    paddingRight: 15,
                  }}
                  onPress={() => {
                    HandleDeleteImage(index);
                    if (image.isOriginal) {
                      setDeleteImageId([...deleteImageId, image.id]);
                    }
                  }}
                >
                  <Text style={{ fontSize: 16, color: "#fff" }}>ⓧ</Text>
                </TouchableOpacity>
              </View>
            ))}
            {/* {imageUrls[0] && (
             
            )}
            {imageUrls[1] && (
              <View style={{ ...styles.imageContainer, paddingTop: 20 }}>
                <Image
                  source={{ uri: imageUrls[1]?.uri }}
                  style={styles.image}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    alignSelf: "flex-end",
                    marginTop: 35,
                    paddingRight: 15,
                  }}
                  onPress={() => {
                    HandleDeleteImage(1);
                    if (imageUrls[1]?.isOriginal) {
                      setDeleteImageId([...deleteImageId, imageUrls[1].id]);
                    }
                  }}
                >
                  <Text style={{ fontSize: 16, color: "#fff" }}>ⓧ</Text>
                </TouchableOpacity>
              </View>
            )}
            {imageUrls[2] && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: imageUrls[2] && imageUrls[2]?.uri }}
                  style={styles.image}
                />
                {imageUrls.length > 3 ? (
                  <TouchableOpacity style={styles.mark}>
                    <View>
                      <SubText style={{ color: "#FDFDFD", fontSize: 18 }}>
                        +{imageUrls.length - 3}
                      </SubText>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      alignSelf: "flex-end",
                      marginTop: 15,
                      paddingRight: 15,
                    }}
                    onPress={() => {
                      HandleDeleteImage(2);
                      if (imageUrls[2]?.isOriginal) {
                        setDeleteImageId([...deleteImageId, imageUrls[2].id]);
                      }
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "#fff" }}>ⓧ</Text>
                  </TouchableOpacity>
                )}
              </View>
            )} */}
          </View>
        )}
        {imageBrowser && (
          <ImagePicker
            onSave={(assets) => {
              setImageUrls(imageUrls ? [...imageUrls, ...assets] : assets);
              console.log(assets);
              setImageBrowser(false);
            }}
            onCancel={() => console.log("no permissions or user go back")}
            albumColumns={3}
            multiple
            galleryColumns={4}
            limit={5}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewPostForm;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#518B1A",
    borderBottomWidth: 1,
    paddingHorizontal: 25,
    paddingBottom: 10,
  },
  centeredText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold", // Customize font weight as needed
    marginLeft: "auto",
    marginRight: "auto",
    color: "#518B1A",
  },
  postButton: {
    // marginLeft: "auto",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#8CC840",
    borderRadius: 5,
  },
  postText: {
    fontSize: 16,
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
    alignItems: "center",
    justifyContent: "space-between",
    // gap: 30,
  },
  hashTag: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  hashTagContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  hashtagBtnContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(26, 26, 26, 0.10)",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 3,
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
  addBtn: {
    backgroundColor: "rgba(26, 26, 26, 0.5)",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 3,
  },
  actionContainer: {
    flexDirection: "row",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    gap: 1,
    paddingHorizontal: 5,
  },
  imageContainer: {
    // position: "absolute",
    flexBasis: "33%",
    borderRadius: 20,
  },
  mark: {
    position: "absolute",
    backgroundColor: "rgba(26, 26, 26, 0.4)",
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  image: {
    height: 300,
    resizeMode: "cover",
    borderRadius: 15,
  },
});
const picker = StyleSheet.create({
  inputIOS: {
    color: "#FF9600",
    height: 35,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dadae8",
  },
  inputAndroid: {
    height: 60,
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dadae8",
    backgroundColor: "#fff",
  },
});
