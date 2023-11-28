import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import googleIcon from "../assets/images/google.png";
import facebookIcon from "../assets/images/facebook.png";
import twitterIcon from "../assets/images/twitter.png";
import VerticalLogo from "../assets/images/verticalLogo.png";
import { handleGoogleLogin } from "../Services/GoogleSingIn";
import { useEffect, useState } from "react";
import { Linking, Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import { getUserProfile } from "../Services/RetrieveNutritionProfile";
import { SuggestMealPlanByDate } from "../Services/SuggestMealPlan";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HandleApi from "../Services/HandleApi";
// import CookieManager from "@react-native-community/cookies";

const StartScreen = ({ navigation }) => {
  const googleLogin = async () => {
    const result = await handleGoogleLogin();
    console.log(result);
    if (result.new == "false") {
      if (result.kidIds) {
        await AsyncStorage.setItem("Authentication", result.token);
        const userProfile = await getUserProfile();
        console.log("id", userProfile.kidProfile[0].id);
        const mealPlan = await SuggestMealPlanByDate();
        // const mealplan = await HandleApi.serverGeneral.get(
        //   `/v1/users/meal-plan?kidId=${userProfile.kidProfile[0].id}`
        // );
        await AsyncStorage.setItem("mealPlan", JSON.stringify(mealPlan));

        navigation.replace("BottomNavigation");
      }
    }
  };
  useEffect(() => {
    // HandleApi.serverGeneral
    //   .get("/v1/auth/logout")
    //   .then((response) => {
    //     console.log(response.data);
    //     // navigation.replace("Auth");
    //   })
    //   .catch((error) => {
    //     console.error(error.data);
    //   });
    // AsyncStorage.clear().then(console.log("cc"));
  }, []);
  return (
    <View style={styles.Container}>
      <View style={styles.Btn}>
        <Image style={[styles.VerticalLogo]} source={VerticalLogo} />
        <TouchableOpacity
          style={styles.SignInBtn}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={styles.btnText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SignUpBtn}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.btnText}>Sign in</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 40 }}>Or sign in by</Text>
        <View style={styles.IconContainer}>
          <TouchableOpacity onPress={() => googleLogin()}>
            <Image
              style={[styles.icon, { marginRight: 10 }]}
              source={googleIcon}
            />
          </TouchableOpacity>

          <Image
            style={[styles.icon, { marginRight: 10 }]}
            source={facebookIcon}
          />
          <Image style={styles.icon} source={twitterIcon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    backgroundColor: "#fff",
  },
  VerticalLogo: {
    width: 217,
    height: 69,
    marginBottom: 32,
  },
  Btn: {
    position: "absolute",
    width: 184,
    height: 99,
    top: 353,
    alignItems: "center",
    justifyContent: "center",
  },
  SignInBtn: {
    backgroundColor: "#518B1A",
    shadowColor: "rgba(26, 26, 26, 0.2)",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    width: 184,
    height: 42,
    shadowOpacity: 1,
    shadowRadius: 4,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  SignUpBtn: {
    backgroundColor: "#8CC840",
    shadowColor: "rgba(26, 26, 26, 0.2)",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    marginTop: 15,
    width: 184,
    height: 42,
    shadowOpacity: 1,
    shadowRadius: 4,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  IconContainer: {
    flexDirection: "row",
    marginTop: 17,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default StartScreen;
