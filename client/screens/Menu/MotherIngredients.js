import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
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

// const ItemList = ({ itemsList, moveItemToWishlist }) => {
//   return (
//     <View>
//       <Text>Items List:</Text>
//       {itemsList.map((item, index) => (
//         <View key={index}>
//           <Text>{item}</Text>
//           <Button
//             title="Move to Wishlist"
//             onPress={() => moveItemToWishlist(item)}
//           />
//         </View>
//       ))}
//     </View>
//   );
// };

// const Wishlist = ({ wishlist }) => {
//   return (
//     <View>
//       <Text>Wishlist:</Text>
//       {wishlist.map((item, index) => (
//         <Text key={index}>{item}</Text>
//       ))}
//     </View>
//   );
// };

const MotherIngredients = ({ route }) => {
  const { navigation, selectedDate, setSelectedDate } = route.params;
  const [selectedItem, setSelectedItem] = useState([]);
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
  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);
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
        <View style={styles.selectedContainer}>
          <SubText
            style={{ color: "#8C8C8C", fontSize: 14, paddingVertical: 10 }}
          >
            Selected 7
          </SubText>
          <FlatList
            data={selectedItem}
            numColumns={5}
            contentContainerStyle={styles.contentContainer}
            renderItem={({ item }) => {
              console.log(item, "hello");
              return (
                <View style={styles.itemContainer}>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => deleteItemfromWishlist(item)}
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
        <View style={styles.ingredientContainer}>
          <HeaderText
            style={{ color: "#518B1A", fontSize: 18, paddingVertical: 10 }}
          >
            All Ingredients
          </HeaderText>
          <FlatList
            data={listItem}
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
    </View>
  );
};

export default MotherIngredients;

const styles = StyleSheet.create({
  ingredientContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentContainer: {
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
  selectedContainer: {
    justifyContent: "space-between",
    // backgroundColor: "#000",
  },
});
