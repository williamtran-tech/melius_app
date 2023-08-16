import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import NavigatorMenu from "../../components/NavigatorMenu";
import { HandleImageApi } from "../../Services/IngredientScan";
import * as ImageManipulator from "expo-image-manipulator";
const ARScan = () => {
  const CameraType = Camera.Constants.Type;
  const [camera, setCamera] = useState(null);
  const [ingreRecognite, setIngreRecognite] = useState();

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
  const takePicture = async () => {
    if (camera) {
      const image = await camera.takePictureAsync({
        quality: 1, // Adjust the quality as needed (0 to 1)
        format: Camera.Constants.Type.jpeg,
      });
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 535, height: 1056 } }],
        { format: "jpeg", compress: 0.8 }
      );
      console.log(resizedPhoto);
      const ingredientList = await HandleImageApi(resizedPhoto.uri);
      setIngreRecognite(ingredientList.segmentation_results);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
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
            onPress={() => takePicture()}
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
          {ingreRecognite &&
            ingreRecognite.map((ingre, index) => {
              console.log(
                "ingredient1" + index + ingre.recognition_results[0].name
              );
            })}
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
