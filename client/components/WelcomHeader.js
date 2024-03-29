import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import SVGicon from "../assets/icon/SVGicon";
import * as Font from "expo-font";
import HeaderText from "./HeaderText";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomHeader = () => {
  const { t } = useTranslation();
  const Weather = SVGicon.Weather;
  const [fontLoaded, setFontLoaded] = useState(false);
  const [name, setName] = useState();
  const currentDate = new Date();
  const options = {
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  const loadFonts = async () => {
    await Font.loadAsync({
      PaytoneOne: require("../assets/fonts/PaytoneOne-Regular.ttf"),
    });
    setFontLoaded(true);
  };
  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem("userProfile");
      console.log({ value });
      if (value) {
        const userProfile = JSON.parse(value);
        // console.log("userProfile:", userProfile.kidProfile[0].healthRecord[0]);
        // Check if the required data is available before setting the state
        // setName(userProfile);
        setName(userProfile.kidProfile[0].fullName.split(" ")[0]);
      }
    } catch (error) {
      console.error("Error fetching userProfile from AsyncStorage:", error);
    }
  };
  useEffect(() => {
    fetchData();
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; // or render a loading indicator
  }

  return (
    <LinearGradient
      colors={["rgba(254, 216, 0, 1)", "rgba(254, 216, 0, 0)"]}
      style={styles.container}
    >
      <View style={styles.innercontainer}>
        <View style={styles.welcomecontainer}>
          <View style={styles.datetextContainer}>
            <Weather />
            <Text style={styles.datetext}> {formattedDate}</Text>
          </View>
          <HeaderText style={styles.text}>{t("welcome")}</HeaderText>
          <HeaderText style={styles.text}>
            Hello {t("Mom")} {name && name}
          </HeaderText>
        </View>
        <View>
          <Image
            source={require("../assets/images/Home_Artwork.png")}
            style={styles.logo}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default WelcomHeader;

const styles = StyleSheet.create({
  container: {
    height: 226,
  },
  innercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: 195,
    height: 195,
    marginTop: 20,
  },
  welcomecontainer: {
    marginTop: 45,
    marginLeft: 25,
  },
  // welcomeText: {
  //   fontFamily: "PaytoneOne",
  //   fontStyle: "normal",
  // },
  text: {
    fontSize: 20,
    fontWeight: 400,
    color: "rgba(81, 139, 26, 1)",
  },
  datetextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  datetext: {
    fontSize: 14,
    fontWeight: 700,
  },
});
