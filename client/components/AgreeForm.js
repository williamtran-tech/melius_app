import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import HeaderText from "./HeaderText";
import SubText from "./SubText";
import { Formik } from "formik";
import Validation from "../Services/Authorizations/Validation";
import { CheckBox } from "react-native-elements";
const AgreeForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <HeaderText style={{ color: "#518B1A", fontSize: 22 }}>
          Agreement
        </HeaderText>
        <SubText style={{ color: "#8C8C8C", fontSize: 12 }}>
          Read the terms below carefully and confirm
        </SubText>
      </View>

      <View style={styles.agreementContainer}>
        <ScrollView>
          <SubText style={styles.agreement}>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using
            'Content here, content here', making it look like readable English.
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and a search for 'lorem ipsum'
            will uncover many web sites still in their infancy. Various versions
            have evolved over the years, sometimes by accident, sometimes on
            purpose (injected humour and the like). Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden- What is Lorem Ipsum? Lorem Ipsum is simply dummy text of
            the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using
            'Content here, content here', making it look like readable English.
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and a search for 'lorem ipsum'
            will uncover many web sites still in their infancy. Various versions
            have evolved over the years, sometimes by accident, sometimes on
            purpose (injected humour and the like). Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden- What is Lorem Ipsum? Lorem Ipsum is simply dummy text of
            the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader
            will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a
            more-or-less normal distribution of letters, as opposed to using
            'Content here, content here', making it look like readable English.
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and a search for 'lorem ipsum'
            will uncover many web sites still in their infancy. Various versions
            have evolved over the years, sometimes by accident, sometimes on
            purpose (injected humour and the like). Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-
          </SubText>
        </ScrollView>
      </View>

      <Formik
        initialValues={{ checkboxValue: false }}
        validationSchema={Validation.agreeValidationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          values,
          setFieldValue,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          isValid,
        }) => (
          <View style={styles.actionContainer}>
            <CheckBox
              title="I agree to the terms and conditions"
              checked={values.checkboxValue}
              onPress={() =>
                setFieldValue("checkboxValue", !values.checkboxValue)
              }
              containerStyle={styles.checkBox}
              textStyle={{ fontSize: 14 }}
              checkedColor="#518B1A"
            />

            {touched.checkboxValue && errors.checkboxValue && (
              <Text style={styles.errorText}>{errors.checkboxValue}</Text>
            )}
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleSubmit}
              disabled={isValid ? false : true}
            >
              <SubText style={styles.buttonTextStyle}>Confirm</SubText>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AgreeForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  agreement: {
    textAlign: "justify",
    color: "#1A1A1A",
  },
  titleContainer: {
    marginTop: 60,
    paddingHorizontal: 25,
    paddingBottom: 15,
  },
  agreementContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    marginHorizontal: 25,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#1a1a1a",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  actionContainer: {
    marginBottom: 100,
  },
  checkBox: {
    backgroundColor: "#fff",
    borderWidth: 0,
    paddingHorizontal: 15,
  },
  buttonStyle: {
    backgroundColor: "rgba(140, 200, 64, 1)",
    borderWidth: 0,
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal: 105,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    paddingLeft: 25,
    paddingBottom: 25,
  },
});
