import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderText from "./HeaderText";
import DateTimePicker from "@react-native-community/datetimepicker";
import SubText from "./SubText";
import moment from "moment";

const MealTime = ({ selectedTime, setSelectedTime, data }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [hourDisplay, setHourDisplay] = useState("");
  const [minDisplay, setMinDisplay] = useState("");

  const handleTimeChange = (event, selected) => {
    if (selected) {
      setSelectedTime(moment(selected));
    }
  };
  console.log(selectedTime);
  useEffect(() => {
    if (selectedTime) {
      setHourDisplay(selectedTime.format("HH"));
      setMinDisplay(selectedTime.format("mm"));
    } else {
      setHourDisplay(moment().format("HH"));
      setMinDisplay(moment().format("mm"));
    }
  }, [selectedTime]);
  const showTimePicker = () => {
    setModalVisible(true);
  };
  const hideTimePicker = () => {
    setModalVisible(false);
  };
  return (
    <View>
      <View>
        <HeaderText style={{ color: "#518B1A", fontSize: 18 }}>
          Meal time
        </HeaderText>
      </View>
      <View style={styles.mealTimeConatiner}>
        <TouchableOpacity
          style={styles.mealTime}
          onPress={() => showTimePicker()}
        >
          <SubText style={{ fontSize: 50 }}>{hourDisplay}</SubText>
        </TouchableOpacity>
        <SubText style={{ fontSize: 50 }}>:</SubText>
        <TouchableOpacity
          style={styles.mealTime}
          onPress={() => showTimePicker()}
        >
          <SubText style={{ fontSize: 50 }}>{minDisplay}</SubText>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <DateTimePicker
            mode="time"
            value={selectedTime.toDate()}
            onChange={handleTimeChange}
            display="spinner"
            style={styles.dateTimePicker}
            textColor="#000"
          />
          <TouchableOpacity
            onPress={() => {
              hideTimePicker();
            }}
            style={styles.btn}
          >
            <SubText style={{ color: "#FFFFFF", fontSize: 18 }}>Done</SubText>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default MealTime;

const styles = StyleSheet.create({
  mealTime: {
    height: 80,
    width: 80,
    backgroundColor: "#F9F9F9",
    borderWidth: 2,
    borderColor: "#d9d7d7",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dateTimePicker: {
    backgroundColor: "#8CC840",
    color: "#000",
  },
  mealTimeConatiner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#000",
    color: "#FFFFFF",
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
