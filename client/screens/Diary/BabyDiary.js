import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import HeaderText from "../../components/HeaderText";
import SubText from "../../components/SubText";
import IconWithText from "../../components/IconWithText";
import { Svg, Path } from "react-native-svg";
import * as shape from "d3-shape";
import HealthIndex from "../../components/HealthIndex";
import { ScrollView } from "react-native-gesture-handler";

const BabyDiary = () => {
  const createHalfDonutPath = (percentage) => {
    const radius = 50; // Adjust the radius as needed
    const centerX = 100; // Adjust the X-coordinate as needed
    const centerY = 100; // Adjust the Y-coordinate as needed

    // Calculate the angle for the given percentage
    const angle = (Math.PI * 50) / 100;

    // Define the starting and ending points of the arc
    const startX = centerX + radius * Math.cos(angle + -270);
    const startY = centerY - radius * Math.sin(angle + -270);
    const endX = centerX + radius * Math.cos(-angle + -270);
    const endY = centerY - radius * Math.sin(-angle + -270);

    // Create the path data string
    const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 1 0 ${endX} ${endY} L ${centerX} ${centerY} Z`;

    return pathData;
  };

  const HalfDonutChart = ({ percentage }) => {
    const path = createHalfDonutPath(percentage);

    return (
      <View>
        <Svg width="200" height="200">
          <Path d={path} fill="blue" />
          <Path d={path} fill="red" />
        </Svg>
      </View>
    );
  };
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
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
            <View style={styles.historyRow}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5 Kg</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>50 cm</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>20 BMI</SubText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <SubText>5/5/2023</SubText>
              </View>
            </View>
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
