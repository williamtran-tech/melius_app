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

const MenuEdit = ({ data, setData, undoItem, setUndoItem, planDetails }) => {
  const [modalVisible, setModalVisible] = useState(false);
  // console.log(planDetails);
  const MorningFood = planDetails
    .filter((item) => {
      const time = moment.utc(item.mealTime).utcOffset(0);
      const hour = time.hours();
      return hour >= 7 && hour < 12;
    })
    .sort((a, b) => moment(a.mealTime).diff(moment(b.mealTime)));
  // console.log(MorningFood);
  const AfternoonFood = planDetails
    .filter((item) => {
      const time = moment.utc(item.mealTime).utcOffset(0);
      const hour = time.hours();
      return hour >= 12 && hour < 18;
    })
    .sort((a, b) => moment(a.mealTime).diff(moment(b.mealTime)));
  const EverningFood = planDetails
    .filter((item) => {
      const time = moment.utc(item.mealTime).utcOffset(0);
      const hour = time.hours();
      return hour >= 18 && hour <= 24;
    })
    .sort((a, b) => moment(a.mealTime).diff(moment(b.mealTime)));
  const renderHiddenItem = (rowData, rowMap) => {
    const { item } = rowData;
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
    // console.log(item);
    return (
      <View style={styles.ItemContainer}>
        <SubText>
          {moment(item.mealTime).subtract(7, "hours").format("HH:mm")}
        </SubText>
        <SubText style={{ flex: 1 }}>{item.recipe.name}</SubText>
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
            Evening
          </SubText>
        </View>
        <View>
          <SwipeListView
            data={EverningFood}
            renderItem={renderListItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-90}
            disableRightSwipe
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
