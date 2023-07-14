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
  // Add more items as needed
];

const windowWidth = Dimensions.get("window").width;
const ListDoctor = ({ row }) => {
  const [isHorizontal, setIsHorizontal] = useState(row);
  const renderItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        padding: 10,
        width: windowWidth / 2 - 15,
      }}
    >
      <View style={styles.card}>
        <View style={styles.doctorAvatarContainer}>
          <Image
            source={require("../assets/images/imageDoctor.png")}
            style={styles.doctorAvatar}
          ></Image>
          <SubText style={styles.name}>Dr. Thuy Vy</SubText>
        </View>
        <View style={styles.doctorInf}>
          <Text style={styles.hospitalName}>{item.title}</Text>
          <Text style={styles.rank}>⭐ 4.5</Text>
        </View>
      </View>
    </View>
  );
  return (
    <View>
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

export default ListDoctor;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15 },
  doctorAvatarContainer: {
    // backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    gap: 15,
    backgroundColor: "#FDFDFD",
    shadowOffset: { width: 0, height: -1 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    paddingVertical: 10,
    borderRadius: 5,
  },
  doctorAvatar: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    resizeMode: "contain",
    borderRadius: windowWidth / 8,
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
