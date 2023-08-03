import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderText from "./HeaderText";
import SubText from "./SubText";
import { ScrollView } from "react-native-gesture-handler";
import { SwipeListView } from "react-native-swipe-list-view";
import moment from "moment";

const MenuEdit = () => {
  const [data, setData] = useState([
    {
      id: 1,
      food: "country french potato soup",
      time: "2023-08-03T07:00:00.000Z",
    },
    {
      id: 2,
      food: "Noodles with tomato sauce with bruised meat",
      time: "2023-07-30T08:00:00.000Z",
    },
    {
      id: 3,
      food: "creamy chicken black bean tacos",
      time: "2023-07-30T13:00:00.000Z",
    },
    {
      id: 4,
      food: "quick peach cobbler",
      time: "2023-07-30T14:00:00.000Z",
    },
    {
      id: 5,
      food: "country french potato soup",
      time: "2023-07-30T19:00:00.000Z",
    },
    {
      id: 6,
      food: "Noodles with tomato sauce with bruised meat",
      time: "2023-07-30T20:00:00.000Z",
    },
  ]);
  const [undoItem, setUndoItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const MorningFood = data
    .filter((item) => {
      const time = moment(item.time);
      const hour = time.hours() - 7;
      // console.log(hour);
      return hour >= 7 && hour <= 12;
    })
    .sort((a, b) => moment(a.time).diff(moment(b.time)));
  const AfternoonFood = data
    .filter((item) => {
      const time = moment(item.time);
      const hour = time.hours() - 7;
      // console.log(hour);
      return hour > 12 && hour <= 18;
    })
    .sort((a, b) => moment(a.time).diff(moment(b.time)));
  const EverningFood = data
    .filter((item) => {
      const time = moment(item.time);
      const hour = time.hours() + 24 - 7;
      // console.log(hour);
      return hour > 18 && hour <= 24;
    })
    .sort((a, b) => moment(a.time).diff(moment(b.time)));
  // console.log(EverningFood);
  const renderHiddenItem = (rowData, rowMap) => {
    const { item } = rowData;
    // console.log(rowData);
    return (
      <View style={styles.ItemContainerHidden}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item)}
        >
          <Image
            source={require("../assets/icon/IconDelete.png")}
            style={{ resizeMode: "contain" }}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  };
  const handleDelete = (itemDelted) => {
    setData((prevData) => prevData.filter((item) => item.id !== itemDelted.id));
    setUndoItem(itemDelted);
    setModalVisible(true);

    setTimeout(() => {
      setModalVisible(false);
      setUndoItem(null);
    }, 3000);
  };
  const renderListItem = (rowData) => {
    const { item } = rowData;

    return (
      <View style={styles.ItemContainer}>
        <SubText>
          {moment(item.time).subtract(7, "hours").format("HH:mm")}
        </SubText>
        <SubText style={{ flex: 1 }}>{item.food}</SubText>
        <TouchableOpacity style={styles.reciprebtn}>
          <Image
            source={require("../assets/icon/IconeditMenu.png")}
            style={{ width: 15, height: 15 }}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  };
  const handleUndo = () => {
    // Restore the item from undoItem and remove it from the undoItem state
    setData((prevData) => [...prevData, undoItem]);
    setUndoItem(null);
    setModalVisible(false);
  };
  useEffect(() => {}, [data]);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 3 }}>
        <View style={styles.section}>
          <Image
            source={require("../assets/icon/Iconmorning.png")}
            style={{ width: 15, height: 15 }}
            resizeMode="contain"
          ></Image>
          <SubText style={{ color: "rgba(26, 26, 26, 0.50)", fontSize: 12 }}>
            Morning
          </SubText>
        </View>
        <View>
          <SwipeListView
            data={MorningFood}
            renderItem={renderListItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-90}
            disableRightSwipe
          />
        </View>
        <View style={styles.section}>
          <Image
            source={require("../assets/icon/Iconmorning.png")}
            style={{ width: 15, height: 15 }}
            resizeMode="contain"
          ></Image>
          <SubText style={{ color: "rgba(26, 26, 26, 0.50)", fontSize: 12 }}>
            Afternoon
          </SubText>
        </View>
        <View>
          <SwipeListView
            data={AfternoonFood}
            renderItem={renderListItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-90}
          />
        </View>
        <View style={styles.section}>
          <Image
            source={require("../assets/icon/Iconmorning.png")}
            style={{ width: 15, height: 15 }}
            resizeMode="contain"
          ></Image>
          <SubText style={{ color: "rgba(26, 26, 26, 0.50)", fontSize: 12 }}>
            Evening
          </SubText>
        </View>
        <View>
          <SwipeListView
            data={EverningFood}
            renderItem={renderListItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-90}
          />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Item Deleted. Undo?</Text>
              <Pressable style={styles.undoButton} onPress={handleUndo}>
                <Text>Undo</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default MenuEdit;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  updateText: { color: "#518B1A", fontSize: 14 },
  updatebtn: {
    width: 50,
    height: 30,
    backgroundColor: "rgba(140, 200, 64, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    shadowColor: "rgba(26, 26, 26, 0.2)",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 2,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingLeft: 25,
    paddingBottom: 5,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#8CC840",
  },
  reciprebtn: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  ItemContainer: {
    flexDirection: "row",
    gap: 25,
    paddingLeft: 25,
    paddingRight: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#8CC840",
    backgroundColor: "#FDFDFD",
    minHeight: 40,
  },
  ItemContainerActive: {
    flexDirection: "row",
    gap: 25,
    paddingLeft: 25,
    paddingRight: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#8CC840",
    backgroundColor: "#8CC840",
  },
  ingredient: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 25,
    gap: 20,
    marginTop: 20,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  ItemContainerHidden: {
    backgroundColor: "#FF0000",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    minHeight: 40,
  },
  deleteButton: {
    flex: 1,
    justifyContent: "center",
    // flexDirection: "row",
    alignItems: "center",
    padding: 5,
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
});
