import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { createRef, useEffect, useRef, useState } from "react";

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
import { Formik } from "formik";
import Loader from "../components/Loader";
import Validation from "../Services/Authorizations/Validation";
import RNPickerSelect from "react-native-picker-select";
import { RadioGroup } from "react-native-radio-buttons-group";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";

const ProfileScreen = ({ navigation }) => {
  const [childInf, setChildInf] = useState();
  const [flag, setFlag] = useState(true);
  const [childFlag, setChildFlag] = useState(true);

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
  const [bottomSheetState, setBottomSheetState] = useState();
  const [loading, setLoading] = useState("false");
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const passwordInputRef = createRef();
  const openBottomSheetModal = () => {
    bottomSheetModalRef.current.expand();
  };

  const closeBottomSheetModal = () => {
    bottomSheetModalRef.current.close();
  };
  const onRefresh = () => {
    setChildFlag(!childFlag);
  };
  useEffect(() => {
    setChildFlag(!childFlag);
  }, [flag]);
  return (
    <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} />}>
      <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
        <View style={{ flex: 2 }}>
          <OverallProfile
            openBottomSheetModal={openBottomSheetModal}
            flag={childFlag}
            setBottomSheetState={setBottomSheetState}
          ></OverallProfile>
        </View>
        <View style={{ flex: 4, paddingHorizontal: 25 }}>
          <PersonalInf
            openBottomSheetModal={openBottomSheetModal}
            flag={flag}
            setBottomSheetState={setBottomSheetState}
          ></PersonalInf>
          <ChildrenInf
            openBottomSheetModal={openBottomSheetModal}
            flag={flag}
            setBottomSheetState={setBottomSheetState}
          ></ChildrenInf>
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
          {bottomSheetState == "avatar" ? (
            <>
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
                  <HeaderText style={{ fontSize: 20 }}>
                    Select avatar
                  </HeaderText>
                </View>
                <View style={{ flex: 1 }}></View>
              </View>
              <View style={{ flex: 1 }}>
                {/* <HeaderText>Select avatar</HeaderText> */}
                <View
                  style={{ flex: 1, backgroundColor: "#000", marginTop: -10 }}
                >
                  <ImagePicker
                    onSave={(assets) => {
                      console.log(assets);
                      updateavatar(assets);
                    }}
                    onCancel={() =>
                      console.log("no permissions or user go back")
                    }
                    albumColumns={3}
                    galleryColumns={4}
                    limit={5}
                  />
                </View>
              </View>
            </>
          ) : bottomSheetState == "parent" ? (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  backgroundColor: "#fff",
                }}
              >
                <Loader loading={loading} />
                <HeaderText
                  style={{
                    textAlign: "center",
                    color: "#518B1A",
                    fontSize: 25,
                  }}
                >
                  Parent Information
                </HeaderText>
                <KeyboardAvoidingView
                  enabled
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <Formik
                    initialValues={{
                      fullName: "concak",
                      phone: "asdasd",
                      email: "",
                      verifiedMethod: "",
                      role: "User",
                    }}
                    validateOnChange
                    validationSchema={Validation.registerValidationSchema}
                    onSubmit={(values) => handleSubmitButton(values)}
                  >
                    {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      errors,
                      touched,
                      isValid,
                    }) => (
                      <View>
                        <View style={styles.SectionStyle}>
                          <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                            Fullname
                          </SubText>
                          <TextInput
                            style={styles.inputStyle}
                            onChangeText={handleChange("fullName")}
                            onBlur={handleBlur("fullName")}
                            value={values.fullName}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Name"
                            placeholderTextColor="#8C8C8C"
                            autoCapitalize="words"
                            returnKeyType="next"
                            blurOnSubmit={false}
                          />
                          {touched.fullName && errors.fullName && (
                            <Text style={styles.errorText}>
                              {errors.fullName}
                            </Text>
                          )}
                        </View>
                        <View style={styles.SectionStyle}>
                          <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                            Phone number
                          </SubText>
                          <TextInput
                            style={styles.inputStyle}
                            onChangeText={handleChange("phone")}
                            onBlur={handleBlur("phone")}
                            value={values.phone}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Phone Number"
                            placeholderTextColor="#8C8C8C"
                            keyboardType="numeric"
                            ref={emailInputRef}
                            returnKeyType="next"
                            blurOnSubmit={false}
                          />
                          {touched.phone && errors.phone && (
                            <Text style={styles.errorText}>{errors.phone}</Text>
                          )}
                        </View>
                        <View style={styles.SectionStyle}>
                          <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                            Email
                          </SubText>
                          <TextInput
                            style={styles.inputStyle}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Email"
                            placeholderTextColor="#8C8C8C"
                            keyboardType="email-address"
                            ref={passwordInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                              ageInputRef.current && ageInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                          />
                          {touched.email && errors.email && (
                            <Text style={styles.errorText}>{errors.email}</Text>
                          )}
                        </View>

                        <TouchableOpacity
                          style={styles.buttonStyle}
                          // onPress={handleSubmit}
                          // onPress={() => setStage("stage2")}
                          disabled={!isValid}
                        >
                          <Text style={styles.buttonTextStyle}>Save</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </Formik>
                </KeyboardAvoidingView>
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.container}>
                <HeaderText
                  style={{
                    textAlign: "center",
                    color: "#518B1A",
                    fontSize: 25,
                    textTransform: "uppercase",
                  }}
                >
                  Children profile
                </HeaderText>
                <Formik
                  initialValues={{
                    fullName: "",
                    gender: "",
                    dob: new Date(),
                  }}
                  validationSchema={Validation.validationProfileChildSchema}
                  // onSubmit={handleSubmit}
                  validateOnChange
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    values,
                    errors,
                  }) => (
                    <View>
                      <View style={styles.SectionStyle}>
                        <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                          Fullname
                        </SubText>
                        <TextInput
                          style={styles.inputStyle}
                          onChangeText={handleChange("fullName")}
                          onBlur={handleBlur("fullName")}
                          value={values.fullName}
                          placeholder="Full Name"
                        />
                        {errors.fullName && <Text>{errors.fullName}</Text>}
                      </View>
                      <View style={styles.SectionStyleRow}>
                        <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                          Gender
                        </SubText>
                        <RadioGroup
                          layout="row"
                          radioButtons={[
                            { id: "male", label: "Male", value: "male" },
                            { id: "female", label: "Female", value: "female" },
                          ]}
                          onPress={(value) => setFieldValue("gender", value)}
                          selectedId={values.gender}
                          borderColor="#8C8C8C"
                        />
                        {errors.gender && <Text>{errors.gender}</Text>}
                      </View>
                      <View style={styles.SectionStyleRow}>
                        <SubText style={{ color: "#8C8C8C", fontSize: 15 }}>
                          Birthday
                        </SubText>
                        {bottomSheetState == "child" && (
                          <DateTimePicker
                            value={values.dob}
                            mode="date"
                            display="clock"
                            onChange={(event, selectedDate) => {
                              // setShowDatePicker(Platform.OS === "ios");
                              const currentDate = selectedDate || values.dob;
                              setFieldValue("dob", currentDate);
                            }}
                          />
                        )}

                        {errors.dob && <Text>{errors.dob}</Text>}
                      </View>

                      <TouchableOpacity
                        style={styles.buttonStyle}
                        // onPress={handleSubmit}
                        // onPress={() => setStage("stage2")}
                        // disabled={!isValid}
                      >
                        <Text style={styles.buttonTextStyle}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </Formik>
              </View>
            </TouchableWithoutFeedback>
          )}
        </BottomSheetModal>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 60,
    marginRight: 60,
    gap: 5,
  },
  buttonStyle: {
    backgroundColor: "rgba(140, 200, 64, 1)",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    color: "white",
    height: 35,
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dadae8",
    color: "#000",
    shadowOffset: { height: 0, width: -10 },
    shadowRadius: 4,
    elevation: 25,
    shadowColor: "rgba(26, 26, 26, 0.2)",
    backgroundColor: "rgba(249, 249, 249, 1)",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
  Picker: {
    height: 3000,
  },
  forgotTextStyle: {
    color: "rgba(140, 140, 140, 1)",
    fontSize: 14,
  },
  registerTextStyle: {
    color: "rgba(81, 139, 26, 1)",
    fontSize: 14,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FDFDFD",
  },
  formcontainer: {
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    // backgroundColor: "#000",
  },
  SectionStyle: {
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 60,
    marginRight: 60,
    gap: 5,
  },
  SectionStyleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 60,
    marginRight: 60,
    gap: 5,
  },
  inputStyle: {
    color: "white",
    height: 35,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dadae8",
    color: "#000",
    shadowOffset: { height: 0, width: -10 },
    shadowRadius: 4,
    elevation: 25,
    shadowColor: "rgba(26, 26, 26, 0.2)",
    backgroundColor: "rgba(249, 249, 249, 1)",
  },
  inputNumberStyle: {
    color: "white",
    height: 35,
    width: 60,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dadae8",
    color: "#000",
    shadowOffset: { height: 0, width: -10 },
    shadowRadius: 4,
    elevation: 25,
    shadowColor: "rgba(26, 26, 26, 0.2)",
    backgroundColor: "rgba(249, 249, 249, 1)",
  },
});
const picker = StyleSheet.create({
  inputIOS: {
    color: "white",
    height: 35,
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dadae8",
    color: "#000",
    shadowOffset: { height: 0, width: -10 },
    shadowRadius: 4,
    elevation: 25,
    shadowColor: "rgba(26, 26, 26, 0.2)",
    backgroundColor: "rgba(249, 249, 249, 1)",
  },
  inputAndroid: {
    height: 60,
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dadae8",
    backgroundColor: "#fff",
  },
});
