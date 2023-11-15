import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderText from "../../components/HeaderText";
import SubText from "../../components/SubText";
import IconWithText from "../../components/IconWithText";
import { Svg, Path } from "react-native-svg";
import * as shape from "d3-shape";
import HealthIndex from "../../components/HealthIndex";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getChildHistory } from "../../Services/RetrieveNutritionProfile";
import moment from "moment";

const BabyDiary = () => {
  const [kidHistory, setKidHistory] = useState();
  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem("userProfile");
      console.log("value", JSON.parse(value));
      if (value) {
        const userProfile = JSON.parse(value);
        // console.log(userProfile.kidProfile[0].id);
        const result = await getChildHistory(userProfile.kidProfile[0].id);
        setKidHistory(result.healthRecords);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.InfContainer}>
        <View style={styles.AvatartMainContsiner}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: "https://assets1.cbsnewsstatic.com/hub/i/2016/12/14/4b7e3037-b62b-4f21-9e5c-1c181da45a6a/screen-shot-2016-12-14-at-4-25-12-pm.png",
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
      <View
        style={{ paddingHorizontal: 25, flexDirection: "row", marginTop: 10 }}
      >
        <HealthIndex></HealthIndex>
      </View>
      <View style={styles.historyContainer}>
        <HeaderText style={styles.HeaderText}>History</HeaderText>
        <View style={styles.historyListContainer}>
          <ScrollView>
            {kidHistory &&
              kidHistory?.map((historyItem) => (
                <View style={styles.historyRow} key={historyItem.id}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <SubText>{historyItem.weight} Kg</SubText>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <SubText>{historyItem.height} cm</SubText>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <SubText>{Math.round(historyItem.bmi)} BMI</SubText>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <SubText>{Math.round(historyItem.tdee)} Calo</SubText>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <SubText>
                      {moment(historyItem.updatedAt).format("DD/MM/YY")}
                    </SubText>
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
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
    marginTop: 10,
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
    paddingHorizontal: 25,
  },
  chart: {
    transform: [{ rotate: "270deg" }], // Rotate chart to make it a half-circle
  },
  HeaderText: {
    color: "#518B1A",
    fontSize: 20,
    marginLeft: 25,
  },
  historyContainer: {
    flex: 1,
  },
  historyListContainer: {
    // backgroundColor: "#000",
    marginTop: 10,
  },
  historyRow: {
    flexDirection: "row",
    borderTopColor: "#518B1A",
    borderTopWidth: 1,
    paddingVertical: 10,
  },
});
