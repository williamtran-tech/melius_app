import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
const ARScan = () => {
  const CameraType = Camera.Constants.Type;
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);

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
              padding: 20,
            }}
            onPress={toggleCameraType}
          >
            <Text style={styles.text}>Flip Camera</Text>
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
