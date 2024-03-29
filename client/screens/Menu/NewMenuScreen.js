import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import NavigatorMenu from "../../components/NavigatorMenu";
import SubText from "../../components/SubText";
import MealTime from "../../components/MealTime";
import moment from "moment";
import {
  addNewMealPlan,
  patchUpdateMealPlan,
} from "../../Services/SuggestMealPlan";
import SearchRecipe from "../../components/SearchRecipe";
import { imageSearchEngine } from "../../Services/FoodSearching";
import HandleApi from "../../Services/HandleApi";
import HeaderText from "../../components/HeaderText";
import { useNavigation } from "@react-navigation/native";

const NewMenuScreen = ({ route }) => {
  const {
    data,
    updateFlag,
    setUpdateFlag,
    menuUpdated,
    setMenuUpdated,
    DateMeal,
  } = route.params;
  const [selectedTime, setSelectedTime] = useState(
    data ? moment.utc(data.mealTime).utcOffset(0) : moment()
  );
  const navigation = useNavigation();
  const [recipeImages, setRecipeImages] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [recipeId, setRecipeId] = useState(data && data.recipe.id);
  const [type, setType] = useState();
  const [imageUrl, setImageUrl] = useState();

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const updateMealPlan = async () => {
    const combinedDateTime = moment(
      `${DateMeal} ${moment(selectedTime).format("HH:mm:ss")}`,
      "YYYY-MM-DD HH:mm:ss"
    ).format("YYYY-MM-DD HH:mm:ss");
    console.log("combinedDateTime:", combinedDateTime);

    const hanldeUpdate = await patchUpdateMealPlan(
      data && data.id,
      combinedDateTime,
      recipeId
    );
    setUpdateFlag(!updateFlag);
    setMenuUpdated(!menuUpdated);
    navigation.goBack();
  };

  const addNewMeal = async () => {
    const combinedDateTime = moment(
      `${DateMeal} ${moment(selectedTime).format("HH:mm:ss")}`,
      "YYYY-MM-DD HH:mm:ss"
    ).format("YYYY-MM-DD HH:mm:ss");
    console.log("combinedDateTime:", combinedDateTime);

    await addNewMealPlan(combinedDateTime, recipeId, type);
    setUpdateFlag(!updateFlag);
    setMenuUpdated(!menuUpdated);
    navigation.goBack();
  };

  const searchRecipe = async (value) => {
    if (recipeId) {
      const response = await HandleApi.serverGeneral.get("v1/recipes/recipes", {
        params: {
          id: recipeId,
        },
      });
      console.log("recipeID", response.data.recipe);
      setSearchResults(response.data.recipe);
      const imageSearchData = await imageSearchEngine(
        response.data.recipe.name
      );
      setImageUrl(imageSearchData);
      console.log(imageSearchData);
    }
  };
  useEffect(() => {
    searchRecipe();
    console.log("DateMeal", DateMeal);
    console.log(menuUpdated);
  }, [updateFlag, recipeId]);
  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      {DateMeal && (
        <View style={{ paddingHorizontal: 25 }}>
          <NavigatorMenu
            Date={moment(DateMeal, "YYYY-MM-DD").format("DD-MM-YYYY")}
            ScreenName="Add"
            navigationName="MenuScreen"
            navigation={navigation}
            action={
              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.btnAction}
                  onPress={() => {
                    data ? updateMealPlan() : addNewMeal();
                  }}
                >
                  <SubText style={{ fontSize: 14, color: "#518B1A" }}>
                    Save
                  </SubText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnActionCancel}
                  onPress={() => {
                    navigation.navigate("MenuScreen");
                  }}
                >
                  <SubText style={{ fontSize: 14, color: "#FF9600" }}>
                    Cancel
                  </SubText>
                </TouchableOpacity>
              </View>
            }
          ></NavigatorMenu>
        </View>
      )}
      <View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <View style={{ paddingHorizontal: 25, marginVertical: 15 }}>
              <MealTime
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              ></MealTime>
            </View>
            <View style={{ paddingHorizontal: 25 }}>
              <HeaderText style={{ color: "#518B1A", fontSize: 18 }}>
                Selected dish
              </HeaderText>
            </View>
            <View>
              <View style={styles.recipecontainer}>
                <View style={{ flex: 2 }}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={{ flex: 2, aspectRatio: 16 / 14 }}
                  />
                </View>
                <View style={{ flex: 2, paddingLeft: 10 }}>
                  <SubText>
                    {searchResults &&
                      searchResults.name &&
                      capitalizeFirstLetter(searchResults.name)}
                  </SubText>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                  }}
                >
                  <SubText>{searchResults.nSteps}</SubText>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 1 }}>
        <SearchRecipe
          setRecipeId={setRecipeId}
          setType={setType}
        ></SearchRecipe>
      </View>
    </View>
  );
};

export default NewMenuScreen;

const styles = StyleSheet.create({
  btnAction: {
    height: 30,
    backgroundColor: "rgba(140, 200, 64, 0.20)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  btnActionCancel: {
    height: 30,
    backgroundColor: "rgba(255, 150, 0, 0.20)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  recipecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 5,
    height: 100,
  },
});
