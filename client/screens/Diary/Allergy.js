import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import HeaderText from "../../components/HeaderText";
import BottomSheetModal from "@gorhom/bottom-sheet";
import IngredientSearch from "../../components/IngredientSearch";
import HandleApi from "../../Services/HandleApi";
import AvailableIngredient from "../../components/AvailableIngredient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Allergy = () => {
  const bottomSheetRefInf = useRef();
  const [updateFlag, setUpdateFlag] = useState(false);
  const [allergy, setAllergy] = useState();
  const [kidId, setKidId] = useState();
  const handleOpenBottomSheet = () => {
    bottomSheetRefInf.current.expand();
  };
  const getAllAllergy = async () => {
    const value = await AsyncStorage.getItem("userProfile");
    if (value) {
      const userProfile = JSON.parse(value);
      try {
        const response = await HandleApi.serverGeneral.get(
          "/v1/users/allergy",
          {
            params: {
              kidId: userProfile.kidProfile[0].id,
            },
          }
        );
        // console.log(response.data);
        setKidId(userProfile.kidProfile[0].id);
        setAllergy(response.data.allergyList);
      } catch (error) {
        console.error(error.message);
      }
      //   setAllergy(response);
    }
  };
  useEffect(() => {
    getAllAllergy();
  }, [updateFlag]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <HeaderText
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#518B1A",
          }}
        >
          List Allergy
        </HeaderText>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            handleOpenBottomSheet();
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#518B1A",
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <AvailableIngredient
          ingredient={allergy}
          setUpdateFlag={setUpdateFlag}
          updateFlag={updateFlag}
          allergy={true}
          kidId={kidId}
        ></AvailableIngredient>
      </View>
      <BottomSheetModal
        ref={bottomSheetRefInf}
        enablePanDownToClose
        snapPoints={["70%"]}
        index={0}
      >
        <IngredientSearch
          updateFlag={updateFlag}
          setUpdateFlag={setUpdateFlag}
          allergy={true}
          kidId={kidId}
        ></IngredientSearch>
      </BottomSheetModal>
    </View>
  );
};

export default Allergy;

const styles = StyleSheet.create({
  addBtn: {
    height: 30,
    width: 30,
    backgroundColor: "#8CC84033",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
});
