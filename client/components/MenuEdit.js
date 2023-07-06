import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import HeaderText from "./HeaderText";
import SubText from "./SubText";
import { ScrollView } from "react-native-gesture-handler";
import { SwipeListView } from "react-native-swipe-list-view";

const MenuEdit = () => {
  const [data, setData] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ]);
  const renderHiddenItem = (rowData, rowMap) => {
    const { item } = rowData;

    return (
      <View style={styles.ItemContainerHidden}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderListItem = (rowData) => {
    // const { item } = rowData;

    return (
      <View style={styles.ItemContainer}>
        <SubText>7:30</SubText>
        <SubText style={{ flex: 1 }}>
          Noodles with tomato sauce with bruised meat
        </SubText>
        <TouchableOpacity style={styles.reciprebtn}>
          <Image
            source={require("../assets/icon/IconeditMenu.png")}
            style={{ width: 15, height: 15 }}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  };
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
            data={data}
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
            Afternoon
          </SubText>
        </View>
        <View>
          <SwipeListView
            data={data}
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
            data={data}
            renderItem={renderListItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-90}
          />
        </View>

        {/* <ScrollView>
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
            <View style={styles.ItemContainer}>
              <SubText>7:30</SubText>
              <SubText style={{ flex: 1 }}>
                Noodles with tomato sauce with bruised meat
              </SubText>
              <TouchableOpacity style={styles.reciprebtn}>
                <Image
                  source={require("../assets/icon/Iconrecipe.png")}
                  style={{ width: 15, height: 15 }}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemContainerActive}>
              <SubText>7:30</SubText>
              <SubText style={{ flex: 1 }}>
                Noodles with tomato sauce with bruised meat
              </SubText>
              <TouchableOpacity style={styles.reciprebtn}>
                <Image
                  source={require("../assets/icon/Iconrecipe.png")}
                  style={{ width: 15, height: 15 }}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemContainer}>
              <SubText>7:30</SubText>
              <SubText style={{ flex: 1 }}>
                Noodles with tomato sauce with bruised meat
              </SubText>
              <TouchableOpacity style={styles.reciprebtn}>
                <Image
                  source={require("../assets/icon/Iconrecipe.png")}
                  style={{ width: 15, height: 15 }}
                ></Image>
              </TouchableOpacity>
            </View>
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
            <View style={styles.ItemContainer}>
              <SubText>7:30</SubText>
              <SubText style={{ flex: 1 }}>
                Noodles with tomato sauce with bruised meat
              </SubText>
              <TouchableOpacity style={styles.reciprebtn}>
                <Image
                  source={require("../assets/icon/Iconrecipe.png")}
                  style={{ width: 15, height: 15 }}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemContainerActive}>
              <SubText>7:30</SubText>
              <SubText style={{ flex: 1 }}>
                Noodles with tomato sauce with bruised meat
              </SubText>
              <TouchableOpacity style={styles.reciprebtn}>
                <Image
                  source={require("../assets/icon/Iconrecipe.png")}
                  style={{ width: 15, height: 15 }}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemContainer}>
              <SubText>7:30</SubText>
              <SubText style={{ flex: 1 }}>
                Noodles with tomato sauce with bruised meat
              </SubText>
              <TouchableOpacity style={styles.reciprebtn}>
                <Image
                  source={require("../assets/icon/Iconrecipe.png")}
                  style={{ width: 15, height: 15 }}
                ></Image>
              </TouchableOpacity>
            </View>
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
            <View style={styles.ItemContainer}>
              <SubText>7:30</SubText>
              <SubText style={{ flex: 1 }}>
                Noodles with tomato sauce with bruised meat
              </SubText>
              <TouchableOpacity style={styles.reciprebtn}>
                <Image
                  source={require("../assets/icon/Iconrecipe.png")}
                  style={{ width: 15, height: 15 }}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemContainerActive}>
              <SubText>7:30</SubText>
              <SubText style={{ flex: 1 }}>
                Noodles with tomato sauce with bruised meat
              </SubText>
              <TouchableOpacity style={styles.reciprebtn}>
                <Image
                  source={require("../assets/icon/Iconrecipe.png")}
                  style={{ width: 15, height: 15 }}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.ItemContainer}>
              <SubText>7:30</SubText>
              <SubText style={{ flex: 1 }}>
                Noodles with tomato sauce with bruised meat
              </SubText>
              <TouchableOpacity style={styles.reciprebtn}>
                <Image
                  source={require("../assets/icon/Iconrecipe.png")}
                  style={{ width: 15, height: 15 }}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView> */}
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
  },
});
