import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import HandleApi from "../Services/HandleApi";
import SubText from "./SubText";
import { findAndAdd } from "../Services/IngredientApi";

const IngredientSearch = ({ updateFlag, setUpdateFlag }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [ingreSelected, setIngreSelected] = useState([]);
  const [searchText, setSearchText] = useState("");
  const debounceTimeoutRef = useRef(null);

  const searchIngredient = (value) => {
    HandleApi.serverGeneral
      .get("v1/ingredients/search-list", {
        params: {
          ingredient: value,
          pageSize: 10,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setSearchResults(response.data.ingredientsList);
        // console.log(response.data.ingredientsList[1].category);
      })
      .catch((error) => console.log(error));
  };
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
  const addNewIngredient = async (fdcId) => {
    console.log(fdcId);
    await findAndAdd(fdcId);
    setUpdateFlag(!updateFlag);
  };
  return (
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
                <View style={styles.ingreContainer}>
                  <View style={{ flex: 1 }}>
                    <SubText>{item.item.foods}</SubText>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      addNewIngredient(item.item.fdcId);
                    }}
                  >
                    <View style={styles.btncontainer}>
                      <SubText style={{ color: "#518B1A" }}>Add</SubText>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item) => item.fdcId}
          />
        )}
      </View>
    </View>
  );
};

export default IngredientSearch;

const styles = StyleSheet.create({
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
  ingreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderBottomColor: "#8CC840",
    borderBottomWidth: 1,
    gap: 10,
  },
  btncontainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#8CC84033",
    borderRadius: 20,
  },
});
