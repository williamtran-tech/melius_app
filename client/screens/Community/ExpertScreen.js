import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HeaderText from "../../components/HeaderText";
import SubText from "../../components/SubText";
import { useNavigation } from "@react-navigation/native";
import ListDoctor from "../../components/ListDoctor";
import ListHospital from "../../components/ListHostpital";

const ExpertScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2.3 }}>
        <View
          style={{
            flex: 3,
            paddingHorizontal: 25,
            paddingVertical: 10,
          }}
        >
          <View style={styles.banner}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-around",
                paddingVertical: 15,
                paddingLeft: 20,
              }}
            >
              <HeaderText style={{ color: "#518B1A", fontSize: 18 }}>
                You have questions about your child's health?
              </HeaderText>
              <HeaderText style={{ color: "#FDFDFD", fontSize: 20 }}>
                Consult now!
              </HeaderText>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/doctor.png")}
                style={{ flex: 1, resizeMode: "contain" }}
              />
            </View>
          </View>
        </View>

        <View style={{ flex: 3, paddingHorizontal: 25 }}>
          <HeaderText style={{ fontSize: 18, color: "#518B1A" }}>
            Features
          </HeaderText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{ width: 64, height: 64 }}
                onPress={() => navigation.navigate("ChatWithExpert")}
              >
                <Image
                  source={require("../../assets/icon/IconMessages.png")}
                  style={{ width: 64, height: 64, resizeMode: "contain" }}
                ></Image>
              </TouchableOpacity>
              <SubText>Messages</SubText>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={{ width: 64, height: 64 }}>
                <Image
                  source={require("../../assets/icon/IconBooking.png")}
                  style={{ width: 64, height: 64, resizeMode: "contain" }}
                ></Image>
              </TouchableOpacity>
              <SubText>Booking</SubText>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{ width: 64, height: 64 }}
                onPress={() => navigation.navigate("Chat247")}
              >
                <Image
                  source={require("../../assets/icon/IconChat.png")}
                  style={{ width: 64, height: 64, resizeMode: "contain" }}
                ></Image>
              </TouchableOpacity>
              <SubText>Chat 24/7</SubText>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={{ width: 64, height: 64 }}>
                <Image
                  source={require("../../assets/icon/IconFAQ.png")}
                  style={{ width: 64, height: 64, resizeMode: "contain" }}
                ></Image>
              </TouchableOpacity>
              <SubText>FAQ</SubText>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 4 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 25,
            }}
          >
            <HeaderText
              style={{
                fontSize: 18,
                color: "#518B1A",

                //   marginTop: 10,
              }}
            >
              Our Expert
            </HeaderText>
            <TouchableOpacity onPress={() => navigation.navigate("Doctor")}>
              <SubText
                style={{
                  fontSize: 14,
                  color: "#518B1A",
                }}
              >
                See more
              </SubText>
            </TouchableOpacity>
          </View>
          <ListDoctor row={true}></ListDoctor>
        </View>
        <View
          style={{
            flex: 1,
            //  backgroundColor: "#000"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 25,
            }}
          >
            <HeaderText
              style={{
                fontSize: 18,
                color: "#518B1A",

                //   marginTop: 10,
              }}
            >
              Hospital
            </HeaderText>
            <TouchableOpacity onPress={() => navigation.navigate("Hospital")}>
              <SubText
                style={{
                  fontSize: 14,
                  color: "#518B1A",
                }}
              >
                See more
              </SubText>
            </TouchableOpacity>
          </View>

          <ListHospital row={true}></ListHospital>
        </View>
      </View>
    </View>
  );
};

export default ExpertScreen;

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#8CC840",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.4,
    shadowColor: "#000",
  },
});
