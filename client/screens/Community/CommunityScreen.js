import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import HeaderText from "../../components/HeaderText";
import SubText from "../../components/SubText";
import { ScrollView } from "react-native-gesture-handler";

const CommunityScreen = () => {
  const [activeTag, setActiveTag] = useState("all");
  return (
    <View>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={activeTag === "all" ? styles.categoryActive : styles.category}
          onPress={() => setActiveTag("all")}
        >
          <HeaderText style={styles.categoryName}>All</HeaderText>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTag === "Q&A" ? styles.categoryActive : styles.category}
          onPress={() => setActiveTag("Q&A")}
        >
          <HeaderText style={styles.categoryName}>Q&A</HeaderText>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            activeTag === "Experience" ? styles.categoryActive : styles.category
          }
          onPress={() => setActiveTag("Experience")}
        >
          <HeaderText style={styles.categoryName}>Experience</HeaderText>
        </TouchableOpacity>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.addBtn}>
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
        <TouchableOpacity style={styles.addBtn}>
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
          <View style={styles.postContainer}>
            <View style={styles.headerPost}>
              <View style={styles.avatarConatiner}>
                <Image
                  style={styles.avatar}
                  source={require("../../assets/images/doctor.png")}
                ></Image>
                <View>
                  <HeaderText>Thien Duc</HeaderText>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    1 minute ago
                  </SubText>
                </View>
              </View>
              <HeaderText style={styles.tag}>Q&A</HeaderText>
            </View>
            <View style={{ marginTop: 20 }}>
              <View>
                <SubText
                  numberOfLines={5}
                  ellipsizeMode="tail"
                  style={{
                    textAlign: "justify",
                    lineHeight: 18,
                  }}
                >
                  My baby doesn't like carrots very much. Is everyone in the
                  family like that? Is there any plan to teach the baby to eat
                  carrots? My baby doesn't like carrots very much. Is everyone
                  in the family like that? Is there any plan to teach the baby
                  to eat carrots?
                </SubText>
              </View>
              <View style={styles.hashTag}>
                <TouchableOpacity>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    #Learn_to_eat
                  </SubText>
                </TouchableOpacity>
                <TouchableOpacity>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    #Learn_to_eat
                  </SubText>
                </TouchableOpacity>
                <TouchableOpacity>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    #Learn_to_eat
                  </SubText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.interactContainer}>
                <Image
                  style={styles.interact}
                  source={require("../../assets/icon/IconComment.png")}
                ></Image>
                <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                  200k
                </SubText>
              </View>
              <View style={styles.interactContainer}>
                <Image
                  style={styles.interact}
                  source={require("../../assets/icon/IconComment.png")}
                ></Image>
                <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                  200k
                </SubText>
              </View>
              <View style={styles.interactContainer}>
                <Image
                  style={styles.interact}
                  source={require("../../assets/icon/IconComment.png")}
                ></Image>
                <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                  200k
                </SubText>
              </View>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={styles.headerPost}>
              <View style={styles.avatarConatiner}>
                <Image
                  style={styles.avatar}
                  source={require("../../assets/images/doctor.png")}
                ></Image>
                <View>
                  <HeaderText>Thien Duc</HeaderText>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    1 minute ago
                  </SubText>
                </View>
              </View>
              <HeaderText style={styles.tag}>Q&A</HeaderText>
            </View>
            <View style={{ marginTop: 20 }}>
              <View>
                <SubText
                  numberOfLines={5}
                  ellipsizeMode="tail"
                  style={{
                    textAlign: "justify",
                    lineHeight: 18,
                  }}
                >
                  My baby doesn't like carrots very much. Is everyone in the
                  family like that? Is there any plan to teach the baby to eat
                  carrots? My baby doesn't like carrots very much. Is everyone
                  in the family like that? Is there any plan to teach the baby
                  to eat carrots?
                </SubText>
              </View>
              <View style={styles.hashTag}>
                <TouchableOpacity>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    #Learn_to_eat
                  </SubText>
                </TouchableOpacity>
                <TouchableOpacity>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    #Learn_to_eat
                  </SubText>
                </TouchableOpacity>
                <TouchableOpacity>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    #Learn_to_eat
                  </SubText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.interactContainer}>
                <Image
                  style={styles.interact}
                  source={require("../../assets/icon/IconComment.png")}
                ></Image>
                <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                  200k
                </SubText>
              </View>
              <View style={styles.interactContainer}>
                <Image
                  style={styles.interact}
                  source={require("../../assets/icon/IconComment.png")}
                ></Image>
                <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                  200k
                </SubText>
              </View>
              <View style={styles.interactContainer}>
                <Image
                  style={styles.interact}
                  source={require("../../assets/icon/IconComment.png")}
                ></Image>
                <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                  200k
                </SubText>
              </View>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={styles.headerPost}>
              <View style={styles.avatarConatiner}>
                <Image
                  style={styles.avatar}
                  source={require("../../assets/images/doctor.png")}
                ></Image>
                <View>
                  <HeaderText>Thien Duc</HeaderText>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    1 minute ago
                  </SubText>
                </View>
              </View>
              <HeaderText style={styles.tag}>Q&A</HeaderText>
            </View>
            <View style={{ marginTop: 20 }}>
              <View>
                <SubText
                  numberOfLines={5}
                  ellipsizeMode="tail"
                  style={{
                    textAlign: "justify",
                    lineHeight: 18,
                  }}
                >
                  My baby doesn't like carrots very much. Is everyone in the
                  family like that? Is there any plan to teach the baby to eat
                  carrots? My baby doesn't like carrots very much. Is everyone
                  in the family like that? Is there any plan to teach the baby
                  to eat carrots?
                </SubText>
              </View>
              <View style={styles.hashTag}>
                <TouchableOpacity>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    #Learn_to_eat
                  </SubText>
                </TouchableOpacity>
                <TouchableOpacity>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    #Learn_to_eat
                  </SubText>
                </TouchableOpacity>
                <TouchableOpacity>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    #Learn_to_eat
                  </SubText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.interactContainer}>
                <Image
                  style={styles.interact}
                  source={require("../../assets/icon/IconComment.png")}
                ></Image>
                <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                  200k
                </SubText>
              </View>
              <View style={styles.interactContainer}>
                <Image
                  style={styles.interact}
                  source={require("../../assets/icon/IconComment.png")}
                ></Image>
                <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                  200k
                </SubText>
              </View>
              <View style={styles.interactContainer}>
                <Image
                  style={styles.interact}
                  source={require("../../assets/icon/IconComment.png")}
                ></Image>
                <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                  200k
                </SubText>
              </View>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={styles.headerPost}>
              <View style={styles.avatarConatiner}>
                <Image
                  style={styles.avatar}
                  source={require("../../assets/images/doctor.png")}
                ></Image>
                <View>
                  <HeaderText>Thien Duc</HeaderText>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    1 minute ago
                  </SubText>
                </View>
              </View>
              <HeaderText style={styles.tag}>Q&A</HeaderText>
            </View>
            <View style={{ marginTop: 20 }}>
              <View>
                <SubText
                  numberOfLines={5}
                  ellipsizeMode="tail"
                  style={{
                    textAlign: "justify",
                    lineHeight: 18,
                  }}
                >
                  My baby doesn't like carrots very much. Is everyone in the
                  family like that? Is there any plan to teach the baby to eat
                  carrots? My baby doesn't like carrots very much. Is everyone
                  in the family like that? Is there any plan to teach the baby
                  to eat carrots?
                </SubText>
              </View>
              <View style={styles.hashTag}>
                <TouchableOpacity>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    #Learn_to_eat
                  </SubText>
                </TouchableOpacity>
                <TouchableOpacity>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    #Learn_to_eat
                  </SubText>
                </TouchableOpacity>
                <TouchableOpacity>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    #Learn_to_eat
                  </SubText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.interactContainer}>
                <Image
                  style={styles.interact}
                  source={require("../../assets/icon/IconComment.png")}
                ></Image>
                <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                  200k
                </SubText>
              </View>
              <View style={styles.interactContainer}>
                <Image
                  style={styles.interact}
                  source={require("../../assets/icon/IconComment.png")}
                ></Image>
                <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                  200k
                </SubText>
              </View>
              <View style={styles.interactContainer}>
                <Image
                  style={styles.interact}
                  source={require("../../assets/icon/IconComment.png")}
                ></Image>
                <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                  200k
                </SubText>
              </View>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={styles.headerPost}>
              <View style={styles.avatarConatiner}>
                <Image
                  style={styles.avatar}
                  source={require("../../assets/images/doctor.png")}
                ></Image>
                <View>
                  <HeaderText>Thien Duc</HeaderText>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    1 minute ago
                  </SubText>
                </View>
              </View>
              <HeaderText style={styles.tag}>Q&A</HeaderText>
            </View>
            <View style={{ marginTop: 20 }}>
              <View>
                <SubText
                  numberOfLines={5}
                  ellipsizeMode="tail"
                  style={{
                    textAlign: "justify",
                    lineHeight: 18,
                  }}
                >
                  My baby doesn't like carrots very much. Is everyone in the
                  family like that? Is there any plan to teach the baby to eat
                  carrots? My baby doesn't like carrots very much. Is everyone
                  in the family like that? Is there any plan to teach the baby
                  to eat carrots?
                </SubText>
              </View>
              <View style={styles.hashTag}>
                <TouchableOpacity>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    #Learn_to_eat
                  </SubText>
                </TouchableOpacity>
                <TouchableOpacity>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    #Learn_to_eat
                  </SubText>
                </TouchableOpacity>
                <TouchableOpacity>
                  <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                    #Learn_to_eat
                  </SubText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.interactContainer}>
                <Image
                  style={styles.interact}
                  source={require("../../assets/icon/IconComment.png")}
                ></Image>
                <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                  200k
                </SubText>
              </View>
              <View style={styles.interactContainer}>
                <Image
                  style={styles.interact}
                  source={require("../../assets/icon/IconComment.png")}
                ></Image>
                <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                  200k
                </SubText>
              </View>
              <View style={styles.interactContainer}>
                <Image
                  style={styles.interact}
                  source={require("../../assets/icon/IconComment.png")}
                ></Image>
                <SubText style={{ color: "rgba(26, 26, 26, 0.50)" }}>
                  200k
                </SubText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
});
