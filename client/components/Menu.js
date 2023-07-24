import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import HeaderText from "./HeaderText";
import SubText from "./SubText";
import { ScrollView } from "react-native-gesture-handler";

const Menu = ({ navigation, selectedDate, setSelectedDate, mealPlan }) => {
  const { suggestedMeals } = mealPlan;
  // console.log(suggestedMeals);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 3 }}>
        <View style={styles.headerContainer}>
          <HeaderText style={{ color: "#518B1A", fontSize: 18 }}>
            BEE's menu !
          </HeaderText>
          <TouchableOpacity
            style={styles.updatebtn}
            onPress={() => navigation.navigate("MenuEditScreen")}
          >
            <SubText style={styles.updateText}>Edit</SubText>
          </TouchableOpacity>
        </View>
        <ScrollView>
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
              <SubText style={{ flex: 1 }}>{suggestedMeals[0].name}</SubText>
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
              <SubText style={{ flex: 1 }}>{suggestedMeals[1].name}</SubText>
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
              <SubText style={{ flex: 1 }}>{suggestedMeals[2].name}</SubText>
              <TouchableOpacity style={styles.reciprebtn}>
                <Image
                  source={require("../assets/icon/Iconrecipe.png")}
                  style={{ width: 15, height: 15 }}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.headerContainer}>
          <HeaderText style={{ color: "#518B1A", fontSize: 18 }}>
            BEE's menu !
          </HeaderText>
          <TouchableOpacity
            style={styles.updatebtn}
            onPress={() => navigation.navigate("MotherIngredients")}
          >
            <SubText style={styles.updateText}>Edit</SubText>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.ingredient}>
            <Image
              source={require("../assets/icon/Iconrice.png")}
              style={styles.image}
            />
            <Image
              source={require("../assets/icon/Iconrice.png")}
              style={styles.image}
            />
            <Image
              source={require("../assets/icon/Iconrice.png")}
              style={styles.image}
            />
            <Image
              source={require("../assets/icon/Iconrice.png")}
              style={styles.image}
            />
            <Image
              source={require("../assets/icon/Iconrice.png")}
              style={styles.image}
            />
            <Image
              source={require("../assets/icon/Iconrice.png")}
              style={styles.image}
            />
            <Image
              source={require("../assets/icon/Iconrice.png")}
              style={styles.image}
            />
            <Image
              source={require("../assets/icon/Iconrice.png")}
              style={styles.image}
            />
            <View style={{ flex: 1 }}>
              <TouchableOpacity>
                <Image
                  source={require("../assets/icon/Iconadd.png")}
                  style={styles.image}
                  resizeMode="contain"
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Menu;

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
});
