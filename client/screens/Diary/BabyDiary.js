import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import HeaderText from "../../components/HeaderText";
import SubText from "../../components/SubText";
import IconWithText from "../../components/IconWithText";

const BabyDiary = () => {
  return (
    <View>
      <View style={styles.InfContainer}>
        <View style={styles.AvatartMainContsiner}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: "https://i2-prod.mirror.co.uk/incoming/article7569057.ece/ALTERNATES/s1200b/successkid.jpg",
              }}
              style={styles.avatar}
            ></Image>
          </View>
        </View>

        <HeaderText style={styles.nameChild}>Tran Vu Thien Duc</HeaderText>
        <View style={styles.row}>
          <IconWithText iconName="Iconfemale" title={"Meal"}></IconWithText>
          <IconWithText
            iconName="Iconbirthday"
            //   title={moment(childInf.dob).format("DD/MM/YYYY")}
            title={"23/08/2002"}
          ></IconWithText>
          <IconWithText
            iconName="Iconyearold"
            //   title={moment().diff(moment(childInf.dob), "years") + " YO"}
            title={5 + " YO"}
          ></IconWithText>
        </View>
      </View>
      <View></View>
      <View></View>
    </View>
  );
};

export default BabyDiary;

const styles = StyleSheet.create({
  InfContainer: {
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
  },
  AvatartMainContsiner: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.4,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  nameChild: {
    color: "#518B1A",
    fontSize: 20,
    marginTop: 10,
    marginRight: "auto",
    marginLeft: "auto",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  chart: {
    transform: [{ rotate: "270deg" }], // Rotate chart to make it a half-circle
  },
});
