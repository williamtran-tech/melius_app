import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderText from "./HeaderText";
import SubText from "./SubText";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import IngredientIcon from "../assets/icon/IngredientsIcon/IngredientIcon";

const Menu = ({
  navigation,
  selectedDate,
  setSelectedDate,
  mealPlan,
  updateFlag,
  setUpdateFlag,
  DateMeal,
}) => {
  const { planDetails } = mealPlan;
  const [listIngre, setListIngre] = useState(IngredientIcon);

  // console.log("planDetails", planDetails);
  const renderItemMenu = (session) => {
    let menuItem = {};
    menuItem = planDetails
      .filter((item) => {
        if (item.mealTime) {
          const time = moment.utc(item.mealTime).utcOffset(0);
          const hour = time.hours();
          // console.log("here", hour);
          if (session == "morning") return hour >= 7 && hour < 12;
          else if (session == "noon") return hour >= 12 && hour < 18;
          else if (session == "everning") return hour >= 18 && hour <= 24;
        }
      })
      .sort((a, b) => moment(a.mealTime).diff(moment(b.mealTime)));
    // console.log(menuItem);
    return menuItem?.map(
      (item) =>
        item.recipe && (
          <View key={item.id} style={styles.ItemContainer}>
            <SubText>
              {moment(item.mealTime).subtract(7, "hours").format("HH:mm")}
            </SubText>
            <SubText style={{ flex: 1 }}>
              {capitalizeFirstLetter(item.recipe.name)}
            </SubText>
            <TouchableOpacity
              style={styles.recipeBtn}
              onPress={() => {
                navigation.navigate("MenuDetail", {
                  data: item.recipe,
                });
              }}
            >
              <Image
                source={require("../assets/icon/Iconrecipe.png")}
                style={{ width: 15, height: 15 }}
              />
            </TouchableOpacity>
          </View>
        )
    );
  };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {}, [updateFlag]);
  return (
    <View style={{ flex: 1 }}>
      <View style={{}}>
        <View style={styles.headerContainer}>
          <HeaderText style={{ color: "#518B1A", fontSize: 18 }}>
            BEE's menu !
          </HeaderText>
          <TouchableOpacity
            style={styles.updatebtn}
            onPress={() =>
              navigation.navigate("MenuEditScreen", {
                planDetails: planDetails,
                updateFlag: updateFlag,
                setUpdateFlag: setUpdateFlag,
                DateMeal: DateMeal,
              })
            }
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
          <View>{renderItemMenu("morning")}</View>
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
          <View>{renderItemMenu("noon")}</View>
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
          <View>{renderItemMenu("everning")}</View>
        </ScrollView>
      </View>
      <View style={{ marginTop: 25 }}>
        <View style={styles.headerContainer}>
          <HeaderText style={{ color: "#518B1A", fontSize: 18 }}>
            Mother's Ingredients
          </HeaderText>
          <TouchableOpacity
            style={styles.updatebtn}
            onPress={() => navigation.navigate("MotherIngredients")}
          >
            <SubText style={styles.updateText}>Edit</SubText>
          </TouchableOpacity>
        </View>
        <FlatList
          data={listIngre}
          numColumns={5}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => moveItemToWishlist(item)}
                >
                  <Image
                    source={item.source}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <SubText style={styles.name}>{item.name}</SubText>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
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
    paddingHorizontal: 25,
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
  ingredientContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentContainer: {
    marginTop: 10,
    flexGrow: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },
  itemContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
  },
  icon: {
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 8,
  },
});
