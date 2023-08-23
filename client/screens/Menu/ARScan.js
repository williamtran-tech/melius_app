import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import NavigatorMenu from "../../components/NavigatorMenu";
import { HandleImageApi } from "../../Services/IngredientScan";
import * as ImageManipulator from "expo-image-manipulator";
import SubText from "../../components/SubText";
import { findListIngredient } from "../../Services/IngredientApi";
import { useNavigation } from "@react-navigation/native";
const ARScan = () => {
  const CameraType = Camera.Constants.Type;
  const [camera, setCamera] = useState(null);
  const [ingreRecognite, setIngreRecognite] = useState();
  const [type, setType] = useState(CameraType.back);
  const [shooting, setShooting] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    // Request camera permissions when the component mounts
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const takePicture = async () => {
    if (camera) {
      setModalVisible(true);
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
      if (ingreRecognite) {
        const data = [
          ...ingreRecognite,
          ...ingredientList.segmentation_results
            .filter((ingre) => {
              return !ingreRecognite.some(
                (item) => item.id === ingre.recognition_results[0].id
              );
            })
            .map((ingre) => {
              return {
                id: ingre.recognition_results[0].id,
                name: ingre.recognition_results[0].name,
              };
            })
            .reduce((acc, ingre) => {
              if (!acc.some((item) => item.id === ingre.id)) {
                acc.push(ingre);
              }
              return acc;
            }, []),
        ];
        setIngreRecognite(data);
        setModalVisible(false);
        setShooting(false);
      } else {
        const data = ingredientList.segmentation_results
          .map((ingre) => {
            return {
              id: ingre.recognition_results[0].id,
              name: ingre.recognition_results[0].name,
            };
          })
          .reduce((acc, ingre) => {
            if (!acc.some((item) => item.id === ingre.id)) {
              acc.push(ingre);
            }
            return acc;
          }, []);

        setIngreRecognite(data);
        setModalVisible(false);
        setShooting(false);
      }

      // setIngreRecognite(data);
    }
  };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const saveIngredientList = async () => {
    setModalVisible(true);
    const saveIngredient = await findListIngredient(ingreRecognite);
    navigation.navigate("MotherIngredients");
  };
  const deleteIngredientById = (idToDelete) => {
    const updatedIngreRecognite = ingreRecognite.filter(
      (ingre) => ingre.id !== idToDelete
    );
    setIngreRecognite(updatedIngreRecognite);
  };
  return (
    <View style={{ flex: 1 }}>
      <Modal visible={modalVisible} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(69, 66, 67, 0.8)",
          }}
        >
          <ActivityIndicator
            size="large"
            color="#518B1A"
            style={styles.loader}
          />
        </View>
      </Modal>
      {hasPermission ? (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={(ref) => setCamera(ref)}
          setHasPermission={true}
        >
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
            {shooting ? (
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
            ) : (
              <View style={styles.actionContainer}>
                <TouchableOpacity
                  style={{ ...styles.keepAdding, backgroundColor: "#8CC840" }}
                  onPress={() => setShooting(true)}
                >
                  <Image
                    source={require("../../assets/icon/IconCamera.png")}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: "contain",
                    }}
                  ></Image>
                  <SubText style={{ color: "#FDFDFD", fontSize: 16 }}>
                    Keep adding
                  </SubText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.keepAdding, backgroundColor: "#518B1A" }}
                  onPress={() => saveIngredientList()}
                >
                  <SubText style={{ color: "#FDFDFD", fontSize: 16 }}>
                    Finish
                  </SubText>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {!shooting && (
            <View
              style={{
                flex: 1,
                backgroundColor: "#FDFDFD",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <ScrollView>
                {ingreRecognite.map((ingre, index) => (
                  <View style={styles.ingreContainer} key={ingre.id}>
                    <View style={{ flex: 1 }}>
                      <SubText>{capitalizeFirstLetter(ingre.name)}</SubText>
                    </View>
                    <TouchableOpacity
                      onPress={() => deleteIngredientById(ingre.id)}
                    >
                      <View style={styles.btncontainer}>
                        <SubText style={{ color: "#FF9600" }}>Delete</SubText>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </Camera>
      ) : (
        <Text>Camera permission not granted</Text>
      )}
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
  ingreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderBottomColor: "#8CC840",
    borderBottomWidth: 1,
    gap: 10,
  },
  btncontainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 150, 0, 0.20)",
    borderRadius: 20,
  },
  actionContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  keepAdding: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    //   backgroundColor: "#000",
    borderRadius: 20,
    marginBottom: 5,
    gap: 10,
  },
});
