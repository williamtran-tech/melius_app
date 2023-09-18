import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import HeaderText from "./HeaderText";
import SubText from "./SubText";
import Comment from "./Comment";
import { useNavigation } from "@react-navigation/native";
import { formatTimeElapsed } from "../Services/FormatTimeElapsed";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Post = ({
  focus,
  post,
  handleReplyPress,
  scrollToComment,
  userId,
  setActivePost,
  setVisible,
  setDataNewPost,
  setActiveComment,
  activeComment,
}) => {
  const navigation = useNavigation();
  let commentCount = 0;

  if (focus)
    post.comments.map((comment) => {
      commentCount++;
      comment.replies.map((reply) => commentCount++);
    });
  return (
    <View
      style={
        focus
          ? { ...styles.postContainer }
          : { ...styles.postContainer, ...styles.shaow }
      }
    >
      <View style={styles.headerPost}>
        <View style={styles.avatarConatiner}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
            {focus && (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <HeaderText style={styles.backbtn}>❮</HeaderText>
              </TouchableOpacity>
            )}
            <Image
              style={styles.avatar}
              source={
                post?.user?.img
                  ? { uri: post.user.img }
                  : require("../assets/images/doctor.png")
              }
            ></Image>
          </View>

          <View>
            <HeaderText>
              {post?.user ? post.user.fullName : "Annoymous"}
            </HeaderText>
            <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
              {formatTimeElapsed(post?.createdAt)} ago
            </SubText>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <HeaderText style={styles.tag}>Q&A</HeaderText>
          {userId === post.user?.id && (
            <TouchableOpacity
              onPress={() => {
                setActivePost(post.id);
                setDataNewPost(post);
                setVisible(true);
              }}
            >
              <Image
                source={require("../assets/icon/iconMoreInf.png")}
                style={{ width: 15, height: 15, resizeMode: "contain" }}
              ></Image>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {post.images != "" && (
        <View style={styles.imagesContainer}>
          {post.images[0] && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: post.images[0]?.imagePath }}
                style={styles.image}
              />
            </View>
          )}
          {post.images[1] && (
            <View style={{ ...styles.imageContainer, paddingTop: 20 }}>
              <Image
                source={{ uri: post.images[1]?.imagePath }}
                style={styles.image}
              />
            </View>
          )}
          {post.images[2] && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: post.images[2] && post.images[2]?.imagePath }}
                style={styles.image}
              />
              {post.images.length > 3 && (
                <View style={styles.mark}>
                  <SubText style={{ color: "#FDFDFD", fontSize: 18 }}>
                    +{post.images.length - 3}
                  </SubText>
                </View>
              )}
            </View>
          )}
        </View>
      )}
      <View>
        <View>
          <SubText
            numberOfLines={5}
            ellipsizeMode="tail"
            style={{
              textAlign: "justify",
              lineHeight: 18,
            }}
          >
            {post?.content}
          </SubText>
        </View>
        <View style={styles.hashTag}>
          {post?.tags?.map((tag) => (
            <TouchableOpacity key={tag.id}>
              <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                #{tag.name}
              </SubText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.interactContainer}>
          <Image
            style={styles.interact}
            source={require("../assets/icon/IconView.png")}
          ></Image>
          <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
            {post.views}
          </SubText>
        </View>
        <View style={styles.interactContainer}>
          <Image
            style={styles.interact}
            source={require("../assets/icon/IconLike.png")}
          ></Image>
          <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
            {post.likes}
          </SubText>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("PostDetail", { data: post.id })}
        >
          <View style={styles.interactContainer}>
            <Image
              style={styles.interact}
              source={require("../assets/icon/IconComment.png")}
            ></Image>
            <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
              {focus ? commentCount : post.comments}
            </SubText>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {focus && (
          <Comment
            handleReplyPress={handleReplyPress}
            comments={post.comments}
            setActiveComment={setActiveComment}
            activeComment={activeComment}
          ></Comment>
        )}
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FDFDFD",
    borderRadius: 5,
  },
  shaow: {
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginVertical: 10,
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
  backbtn: {
    fontSize: 20,
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    gap: 5,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  imageContainer: {
    // position: "absolute",
    flex: 1,
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
