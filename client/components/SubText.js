import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";

const SubText = ({ style, ...props }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        PublicSan: require("../assets/fonts/PublicSans-Regular.ttf"),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);
  if (!fontLoaded) {
    return null; // or render a loading indicator
  }
  const customStyles = [{ fontFamily: "PublicSan" }, style];

  return <Text style={customStyles} {...props} />;
};

export default SubText;
