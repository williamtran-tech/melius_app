import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import SubText from "./SubText";
const data = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
  { id: "4", title: "Item 4" },
  { id: "5", title: "Item 5" },
  { id: "6", title: "Item 5" },
  { id: "7", title: "Item 5" },
  { id: "8", title: "Item 5" },
  { id: "9", title: "Item 5" },
  { id: "10", title: "Item 5" },
  // Add more items as needed
];

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ListHospital = ({ row }) => {
  const [isHorizontal, setIsHorizontal] = useState(row);
  const renderItem = ({ item }) => (
    <View
      style={{
        // flex: 1,
        padding: 10,
        width: windowWidth / 2 - 15,
        height: !row ? windowHeight / 3 - 70 : null,
      }}
    >
      <View style={styles.card}>
        <View style={styles.doctorAvatarContainer}>
          <Image
            source={require("../assets/images/imageHospital.png")}
            style={styles.doctorAvatar}
          ></Image>
          <SubText style={styles.name}>Nhi dong Hospital</SubText>
        </View>
        <View style={styles.doctorInf}>
          {/* <Text style={styles.hospitalName}>{item.title}</Text> */}
          <Text style={styles.rank}>⭐⭐⭐⭐⭐</Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={isHorizontal}
        numColumns={isHorizontal ? 1 : 2}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default ListHospital;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15 },
  doctorAvatarContainer: {
    // backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  card: {
    gap: 15,
    backgroundColor: "#FDFDFD",
    shadowOffset: { width: 0, height: -1 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    borderRadius: 5,
    flex: 1,
    // backgroundColor: "#000",
    paddingBottom: 10,
  },
  doctorAvatar: {
    flex: 1,
    width: windowWidth / 2 - 40,
    resizeMode: "contain",
    // backgroundColor: "#000",
  },
  doctorAvatar: {
    flex: 1,
    width: windowWidth / 2 - 40,
    resizeMode: "contain",
    // backgroundColor: "#000",
  },
  name: {
    fontSize: 14,
  },
  doctorInf: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  hospitalName: {
    fontSize: 14,
    color: "rgba(26, 26, 26, 0.50)",
  },
  rank: {
    fontSize: 12,
    color: "#1A1A1A",
  },
});
