import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import NavigatorMenu from "../../components/NavigatorMenu";
const ARScan = () => {
  const CameraType = Camera.Constants.Type;
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    // Request camera permissions when the component mounts
    // requestCameraPermission();
  }, []);

  //   const requestCameraPermission = async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={styles.camera} type={type}>
        <View style={{ paddingHorizontal: 25 }}>
          <NavigatorMenu
            ScreenName="AR Scan"
            navigationName="MenuScreen"
          ></NavigatorMenu>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: "center",
              alignItems: "center",
              height: 80,
              width: 80,
              justifyContent: "center",
              //   backgroundColor: "#000",
              borderRadius: 40,
              backgroundColor: "#8CC840",
              marginBottom: 5,
            }}
            onPress={toggleCameraType}
          >
            <Image
              source={require("../../assets/icon/IconCamera.png")}
              style={{
                height: 40,
                width: 40,
                resizeMode: "contain",
              }}
            ></Image>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default ARScan;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  text: {
    color: "#ffff",
  },
});
