import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import OverallProfile from "../components/OverallProfile";
import PersonalInf from "../components/PersonalInf";
import ChildrenInf from "../components/ChildrenInf";
import Setting from "../components/Setting";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheetModal from "@gorhom/bottom-sheet";
import { ImagePicker } from "expo-image-multiple-picker";
import HeaderText from "../components/HeaderText";
import SubText from "../components/SubText";
import HandleApi from "../Services/HandleApi";
import * as MediaLibrary from "expo-media-library";
import { getUserProfile } from "../Services/RetrieveNutritionProfile";
const ProfileScreen = ({ navigation }) => {
  const [childInf, setChildInf] = useState();
  const [flag, setFlag] = useState(true);
  const showAllItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();

      const items = await AsyncStorage.multiGet(keys);

      console.log("All items in AsyncStorageeee:");
      items.forEach(([key, value]) => {
        console.log(key, value);
      });
    } catch (error) {
      console.error("Error retrieving items from AsyncStorasge:", error);
    }
  };
  const updateavatar = async (photo) => {
    const formData = new FormData();

    if (photo) {
      try {
        const assetInfo = await MediaLibrary.getAssetInfoAsync(photo[0]);
        const localUri = assetInfo.localUri;
        const fileName = `photo_${Date.now()}.jpg`; // You can customize the file name

        // Append the image to the FormData object with a custom name
        formData.append("avatar", {
          uri: localUri,
          name: fileName,
          type: "image/jpeg", // You can adjust the MIME type based on your needs
        });
      } catch (error) {
        console.error("Error while processing photo:", error.message);
      }
    }

    console.log(formData);
    try {
      const response = await HandleApi.serverFormData.post(
        "v1/users/profile",
        formData
      );
      closeBottomSheetModal();
      getUserProfile();
      setFlag(!flag);
      console.log(response.data);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  const bottomSheetModalRef = useRef(null);
  const openBottomSheetModal = () => {
    bottomSheetModalRef.current.expand();
  };

  const closeBottomSheetModal = () => {
    bottomSheetModalRef.current.close();
  };
  useEffect(() => {}, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      <View style={{ flex: 2 }}>
        <OverallProfile
          openBottomSheetModal={openBottomSheetModal}
          flag={flag}
        ></OverallProfile>
      </View>
      <View style={{ flex: 4, paddingHorizontal: 25 }}>
        <PersonalInf flag={flag}></PersonalInf>
        <ChildrenInf></ChildrenInf>
      </View>
      <View style={{ flex: 2 }}>
        <Setting></Setting>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["100%"]} // Define your snap points here
        index={-1} // The initial snap point (0 means the first snap point)
        enablePanDownToClose
      >
        <View
          style={{
            position: "absolute",
            zIndex: 10,
            width: "100%",
            // backgroundColor: "#000",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 25,
          }}
        >
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <TouchableOpacity onPress={() => closeBottomSheetModal()}>
              <SubText>Cancel</SubText>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <HeaderText style={{ fontSize: 20 }}>Select avatar</HeaderText>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={{ flex: 1 }}>
          {/* <HeaderText>Select avatar</HeaderText> */}
          <View style={{ flex: 1, backgroundColor: "#000", marginTop: -10 }}>
            <ImagePicker
              onSave={(assets) => {
                console.log(assets);
                updateavatar(assets);
              }}
              onCancel={() => console.log("no permissions or user go back")}
              albumColumns={3}
              galleryColumns={4}
              limit={5}
            />
          </View>
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
