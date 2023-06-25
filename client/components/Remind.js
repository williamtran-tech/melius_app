import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import HeaderText from "./HeaderText";

const Remind = () => {
  const reminders = [
    {
      id: "1",
      title: "Update your baby's weight and height",
      time: "Today",
    },
    { id: "2", title: "Reminder 2", time: "08:45" },
    // Add more reminders as needed
  ];

  return (
    <View style={styles.remindContainer}>
      {/* <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
         
        )}
      /> */}
      <HeaderText style={{ fontSize: 18, color: "#518B1A", paddingLeft: 25 }}>
        Remind
      </HeaderText>
      {reminders.map((item) => {
        return (
          <View style={styles.ItemRemindContainer}>
            <Text style={styles.itemTime}>{item.time}</Text>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        );
      })}
      <View style={styles.ItemRemindContainerActive}>
        <Text style={styles.itemTime}>{reminders[1].time}</Text>
        <Text style={styles.itemTitle}>{reminders[1].title}</Text>
      </View>
    </View>
  );
};

export default Remind;

const styles = StyleSheet.create({
  remindContainer: {
    flex: 1,
    paddingTop: 20,
  },
  ItemRemindContainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 25,
    backgroundColor: "rgba(254, 216, 0, 0)",
    alignItems: "center",
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    borderColor: "#8CC840",
  },
  ItemRemindContainerActive: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 25,
    backgroundColor: "#8CC840",
    alignItems: "center",
  },
  itemTime: {
    flex: 1,
    paddingLeft: 5,
    fontSize: 16,
  },
  itemTitle: {
    flex: 3,
    fontSize: 12,
  },
});
