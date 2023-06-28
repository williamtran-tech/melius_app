import HeaderText from "../components/HeaderText";
import { Calendar } from "react-native-calendars";
const MonthCalendar = ({ selectedDate, setSelectedDate }) => {
  const CustomHeader = ({ month }) => {
    return (
      <HeaderText style={{ fontSize: 20, color: "#8CC840" }}>
        {month}
      </HeaderText>
    );
  };
  return (
    <Calendar
      current={selectedDate}
      renderHeader={(date) => <CustomHeader month={date.toString("MMMM")} />}
      onDayPress={(day) => {setSelectedDate(day.dateString) 
    console.log(day)
    }}
      markedDates={{
        [selectedDate]: { selected: true, selectedColor: "#FED800" },
      }}
      firstDay={1}
      theme={{
        calendarBackground: "#FDFDFD",
        textSectionTitleColor: "rgba(26, 26, 26, 0.50)",
        selectedDayBackgroundColor: "#FED800",
        selectedDayTextColor: "#518B1A",

        todayTextColor: "#518B1A",
        dayTextColor: "#000",
        textDisabledColor: "#d9e1e8",
        dotColor: "#00adf5",
        selectedDotColor: "#ffffff",
        arrowColor: "#8CC840",
        monthTextColor: "#8CC840",
        indicatorColor: "#8CC840",
        "stylesheet.day.basic": {
          today: {
            fontWeight: "700",
          },
          todayText: {
            fontWeight: "700",
            color: "#518B1A",
            fontSize: 20,
          },
          text: {
            fontWeight: "700",
            textAlign: "center",
            alignSelf: "center",
            fontSize: 18,
          },
          base: {
            height: 32,
            width: 32,
            justifyContent: "center", // Center the content vertically
            alignItems: "center", // Center the content horizontally
            paddingTop: 4,
          },
        },
      }}
    />
  );
};

export default MonthCalendar;

