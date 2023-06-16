import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from '../assets/images/Logo.png'
import { LinearGradient } from "expo-linear-gradient"; 
import SVGicon from "../assets/icon/SVGicon";
import * as Font from 'expo-font';
import { useEffect } from "react";
import Paytone from"../assets"
const WelcomHeader = () => {
    const Weather = SVGicon.Weather 
    const loadFonts = async () => {
        await Font.loadAsync({
          'YourCustomFont': require('../assets/fonts/PaytoneOne-Regular.ttf'),
        });
      };
  return (
    <LinearGradient  colors={['rgba(254, 216, 0, 1)', 'rgba(254, 216, 0, 0)']} style={styles.container}>
      <View style={styles.innercontainer}>
          <View >
        <Text><Weather/> Hello Mother F*ck</Text>
        <Text style={{ fontFamily: 'PaytoneOne' }}>Hello Mother Fcdk</Text>
      </View>
      <View>
        <Image source={Logo} style={styles.logo}></Image>
      </View>
      </View>
      
    </LinearGradient>
  );
};

export default WelcomHeader;


const styles = StyleSheet.create({
    container:{
        height:226,

    },
    innercontainer:{
        flexDirection:"row",
        justifyContent: 'space-between',
    },
    logo:{
        width:193,
        height:193
    },
    welcomeText:{
        fontFamily:"PaytoneOne",
        fontStyle: 'normal',
    }
});

