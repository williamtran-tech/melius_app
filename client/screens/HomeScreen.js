// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomHeader from "../components/WelcomHeader";
import DailyInfo from "../components/DailyInfo";
import Remind from "../components/Remind";
import MenuSuggest from "../components/MenuSuggest";
import { HandleExpireToken } from "../Services/ExpireToken";
import { useNavigation } from "@react-navigation/native";
import HandleApi from "../Services/HandleApi";
import { getUserProfile } from "../Services/RetrieveNutritionProfile";
import Loader from "../components/Loader";
import { ImagePicker } from "expo-image-multiple-picker";
import BottomSheetModal from "@gorhom/bottom-sheet";
import HeaderText from "../components/HeaderText";
import NutritionFact from "../components/NutritionFact";
import IngredientList from "../components/IngredientList";
import InstructionCook from "../components/InstructionCook";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState();
  const [imageUriDetail, setImageUriDetail] = useState();
  const bottomSheetRefInf = useRef();

  const CheckTokenExpired = async () => {
    const isTokenExpired = await HandleExpireToken();
    // console.log(isTokenExpired);

    // AsyncStorage.clear();
    // HandleApi.serverGeneral
    //         .get("/v1/auth/logout")
    //         .then((response) => {
    //           console.log(response.data);
    //           navigation.replace("Auth");
    //         })
    //         .catch((error) => {
    //           console.error(error.data);
    //         });
    if (isTokenExpired) {
      AsyncStorage.removeItem("Authentication", (error) => {
        if (error) {
          console.error(error);
        } else {
          navigation.replace("Auth");
          // HandleApi.serverGeneral
          //   .get("/v1/auth/logout")
          //   .then((response) => {
          //     console.log(response.data);
          //     navigation.replace("Auth");
          //   })
          //   .catch((error) => {
          //     console.error(error.data);
          //   });
        }
      });
    }
  };
  const handleOpenMenu = (data, uriDetail) => {
    console.log("uriDetail,", uriDetail);
    setRecipe(data);
    setImageUriDetail(uriDetail);
    bottomSheetRefInf.current.expand();
  };
  useEffect(() => {
    CheckTokenExpired();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View>
        <WelcomHeader></WelcomHeader>
      </View>
      <View style={styles.container}>
        <View style={styles.DaylyInfcontainer}>
          <DailyInfo></DailyInfo>
        </View>
        <View style={styles.ReminderContainer}>
          <Remind></Remind>
        </View>
        <View style={styles.MenuContainer}>
          <MenuSuggest handleOpenMenu={handleOpenMenu}></MenuSuggest>
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetRefInf}
        enablePanDownToClose
        snapPoints={["95%"]}
        index={-1}
        // onChange={(index) => {
        //   if (index === -1) setVisible(false);
        // }}
      >
        {recipe && (
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              <View style={{ flex: 1, paddingHorizontal: 25 }}>
                <Image
                  source={imageUriDetail}
                  style={{
                    flex: 1,
                    resizeMode: "cover",
                    aspectRatio: 16 / 9,
                    borderRadius: 15,
                  }}
                ></Image>
              </View>
              <View style={{ paddingTop: 25, paddingHorizontal: 25 }}>
                <HeaderText style={{ color: "#518B1A", fontSize: 18 }}>
                  NutritionFact
                </HeaderText>
              </View>
              <View>
                <NutritionFact
                  nutrition={recipe.nutrition}
                  servingSize={recipe.servingSize}
                ></NutritionFact>
              </View>
              <View style={{ padding: 25 }}>
                <HeaderText style={{ color: "#518B1A", fontSize: 18 }}>
                  Ingredients ({recipe.nIngredients})
                </HeaderText>
              </View>

              <View>
                <IngredientList data={recipe}></IngredientList>
              </View>
              <View style={{ padding: 25 }}>
                <HeaderText style={{ color: "#518B1A", fontSize: 18 }}>
                  Instruction
                </HeaderText>
              </View>
              <View>
                <InstructionCook data={recipe}></InstructionCook>
              </View>
            </ScrollView>
          </View>
        )}
      </BottomSheetModal>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -85,
    backgroundColor: "hsla(51, 100%, 50%, 0)",
  },
  DaylyInfcontainer: {
    flex: 1,
    paddingHorizontal: 15,
    // backgroundColor: "#000",
  },
  ReminderContainer: { flex: 1 },
  MenuContainer: {
    flex: 2,
  },
});
