import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import IngredientIcon from "../../assets/icon/IngredientsIcon/IngredientIcon";
import HeaderText from "../../components/HeaderText";
import NavigatorMenu from "../../components/NavigatorMenu";
import SubText from "../../components/SubText";
import BottomSheet from "@gorhom/bottom-sheet";
import Animated from "react-native-reanimated";
import IngredientsList from "../../components/IngredientsList";
import HandleApi from "../../Services/HandleApi";
import IngredientSearch from "../../components/IngredientSearch";
import AvailableIngredient from "../../components/AvailableIngredient";
import { getAvailableIngredient } from "../../Services/IngredientApi";

const MotherIngredients = ({ route }) => {
  const bottomSheetRef = useRef(0);

  const handleSearchPress = () => bottomSheetRef.current.expand();
  const handleClosePress = () => bottomSheetRef.current.close();
  const debounceTimeoutRef = useRef(null);

  const { navigation, selectedDate, setSelectedDate } = route.params;
  const [selectedItem, setSelectedItem] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [listItem, setListItem] = useState(IngredientIcon);

  const moveItemToWishlist = (item) => {
    setSelectedItem((prevSelectedItem) => [...prevSelectedItem, item]);
    setListItem((prevList) =>
      prevList.filter((listItem) => listItem.name !== item.name)
    );
  };
  const deleteItemfromWishlist = (item) => {
    setListItem((prevSelectedItem) => [...prevSelectedItem, item]);
    setSelectedItem((prevList) =>
      prevList.filter((listItem) => listItem.name !== item.name)
    );
  };
  const [ingredient, setingredient] = useState();
  const handleGetIngredient = async () => {
    const response = await getAvailableIngredient();
    setingredient(response);
  };
  useEffect(() => {
    console.log("mount");
    handleGetIngredient();
  }, [selectedItem, updateFlag]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      {selectedDate && (
        <View style={{ paddingHorizontal: 25 }}>
          <NavigatorMenu
            Date={selectedDate}
            ScreenName="Mother's Ingredients"
            navigationName="MenuScreen"
            navigation={navigation}
            action={
              <TouchableOpacity
                style={styles.container}
                onPress={() => navigation.navigate("ARScan")}
              >
                <SubText style={{ fontSize: 14, color: "#FDFDFD" }}>
                  AR Scan
                </SubText>
                <Image
                  source={require("../../assets/icon/IconCamera.png")}
                  style={{ height: 20, width: 20 }}
                ></Image>
              </TouchableOpacity>
            }
          ></NavigatorMenu>
        </View>
      )}
      <ScrollView>
        <View style={{ flex: 1, marginVertical: 10, paddingHorizontal: 25 }}>
          {ingredient && (
            <AvailableIngredient
              ingredient={ingredient}
              setUpdateFlag={setUpdateFlag}
              updateFlag={updateFlag}
            ></AvailableIngredient>
          )}

          <IngredientsList
            selectedItem={selectedItem}
            listItem={listItem}
            deleteItemfromWishlist={deleteItemfromWishlist}
            moveItemToWishlist={moveItemToWishlist}
            handleSearchPress={handleSearchPress}
            updateFlag={updateFlag}
            setUpdateFlag={setUpdateFlag}
          ></IngredientsList>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["70%"]}
        enablePanDownToClose={true}
        initialSnap={0}
      >
        <IngredientSearch
          updateFlag={updateFlag}
          setUpdateFlag={setUpdateFlag}
        ></IngredientSearch>
      </BottomSheet>
    </View>
  );
};

export default MotherIngredients;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#518B1A",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 10,
    borderRadius: 16,
  },
  bottomSheetContent: {},
});
