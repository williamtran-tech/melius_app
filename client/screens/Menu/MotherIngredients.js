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

const MotherIngredients = ({ route }) => {
  const bottomSheetRef = useRef(0);

  const handleSearchPress = () => bottomSheetRef.current.expand();
  const handleClosePress = () => bottomSheetRef.current.close();
  const debounceTimeoutRef = useRef(null);

  const { navigation, selectedDate, setSelectedDate } = route.params;
  const [selectedItem, setSelectedItem] = useState([]);
  const [listItem, setListItem] = useState(IngredientIcon);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

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
  const searchIngredient = (value) => {
    HandleApi.serverGeneral
      .get("v1/ingredients/search-list", {
        params: {
          ingredient: value,
          pageSize: 3,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSearchResults(response.data.ingredientsList);
        // console.log(response.data.ingredientsList[1].category);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);
  const handleInputChange = (text) => {
    setSearchText(text);
    // Perform search operation here based on the input text
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      searchIngredient(text);
    }, 500);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      {selectedDate && (
        <View style={{ paddingHorizontal: 25 }}>
          <NavigatorMenu
            Date={selectedDate}
            ScreenName="Mother's Ingredients"
            navigationName="MenuScreen"
            navigation={navigation}
            action={<View style={styles.container}></View>}
          ></NavigatorMenu>
        </View>
      )}
      <View style={{ flex: 1, marginVertical: 10, paddingHorizontal: 25 }}>
        <IngredientsList
          selectedItem={selectedItem}
          listItem={listItem}
          deleteItemfromWishlist={deleteItemfromWishlist}
          moveItemToWishlist={moveItemToWishlist}
          handleSearchPress={handleSearchPress}
        ></IngredientsList>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["70%"]}
        enablePanDownToClose={true}
        initialSnap={0}
      >
        <View style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetHeader}>
            <TextInput
              style={styles.searchInput}
              placeholder="Enter search text"
              value={searchText}
              onChangeText={handleInputChange}
            />
            {/* <TouchableOpacity onPress={handleClosePress}>
              <Text>Close</Text>
            </TouchableOpacity> */}
          </View>
          <View>
            {searchResults && (
              <FlatList
                data={searchResults}
                renderItem={(item) => {
                  return (
                    <View>
                      <SubText>{item.item.foods}</SubText>
                    </View>
                  );
                }}
                keyExtractor={(item) => item.fdcId}
              />
            )}
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default MotherIngredients;

const styles = StyleSheet.create({
  bottomSheetContent: {},
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 25,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#8f8f8f",
    padding: 5,
    borderRadius: 20,
  },
});
