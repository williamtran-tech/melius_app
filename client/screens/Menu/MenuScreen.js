import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import HeaderText from "../../components/HeaderText";
import { useState } from "react";
import MonthCalendar from "../../components/MonthCalendar";
import WeekCalendar from "../../components/WeekCalendar";
import moment from "moment";
import ProjectNutrition from "../../components/ProjectNutrition";
import Menu from "../../components/Menu";
import {
  RefreshMealPlanByDate,
  suggestMealPlan,
  SuggestMealPlanByDate,
  updateMealPlan,
} from "../../Services/SuggestMealPlan";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../components/Loader";
const MenuScreen = ({ route }) => {
  const [activeTab, setActiveTab] = useState("daily");
  const [updateFlag, setUpdateFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  const { navigation, selectedDate, setSelectedDate } = route.params;
  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const [mealPlan, setMealPlan] = useState();
  const [DateMeal, setDateMeal] = useState(moment().format("YYYY-MM-DD"));
  const fetchMealPlan = async () => {
    try {
      const mealPlanData = await SuggestMealPlanByDate(DateMeal);
      setMealPlan(mealPlanData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meal plan:", error);
    }
  };
  const refreshMealPlan = async () => {
    try {
      const mealPlanData = await RefreshMealPlanByDate(DateMeal);
      setMealPlan(mealPlanData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meal plan:", error);
    }
  };
  useEffect(() => {
    fetchMealPlan();
  }, [updateFlag, DateMeal]);
  const currentDate = moment().format("dddd, MMMM D");
  const renderCalendar = () => {
    switch (activeTab) {
      case "daily":
        return (
          <HeaderText
            style={{ color: "#8CC840", fontSize: 20, paddingTop: 20 }}
          >
            {currentDate}
          </HeaderText>
        );
      case "week":
        // console.log(selectedDate);
        return (
          <WeekCalendar
            selectedDate={DateMeal}
            setSelectedDate={setDateMeal}
            fetchMealPlan={fetchMealPlan}
            setLoading={setLoading}
          ></WeekCalendar>
        );
      case "month":
        return (
          <MonthCalendar
            selectedDate={DateMeal}
            setSelectedDate={setDateMeal}
            setLoading={setLoading}
          ></MonthCalendar>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      <View>
        <View style={styles.headerTab}>
          <TouchableOpacity
            onPress={() => {
              handleTabPress("daily");
              setDateMeal(moment().format("YYYY-MM-DD"));
            }}
            style={
              activeTab === "daily"
                ? {
                    ...styles.tab,
                    borderBottomWidth: 2,
                    borderBottomColor: "#518B1A",
                  }
                : styles.tab
            }
          >
            <HeaderText
              style={activeTab === "daily" ? styles.Text : styles.TextActive}
            >
              Daily
            </HeaderText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabPress("week")}
            style={
              activeTab === "week"
                ? {
                    ...styles.tab,
                    borderBottomWidth: 2,
                    borderBottomColor: "#518B1A",
                  }
                : styles.tab
            }
          >
            <HeaderText
              style={activeTab === "week" ? styles.Text : styles.TextActive}
            >
              Week
            </HeaderText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabPress("month")}
            style={
              activeTab === "month"
                ? {
                    ...styles.tab,
                    borderBottomWidth: 2,
                    borderBottomColor: "#518B1A",
                  }
                : styles.tab
            }
          >
            <HeaderText
              style={activeTab === "month" ? styles.Text : styles.TextActive}
            >
              Month
            </HeaderText>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 25 }}>{renderCalendar()}</View>
      </View>
      {activeTab != "month" && (
        <View style={{ paddingHorizontal: 25, marginTop: 10 }}>
          <ProjectNutrition></ProjectNutrition>
        </View>
      )}
      <View style={{ marginTop: 20, flex: 1 }}>
        {mealPlan && (
          <Menu
            navigation={navigation}
            DateMeal={DateMeal}
            setSelectedDate={setSelectedDate}
            mealPlan={mealPlan}
            updateFlag={updateFlag}
            setUpdateFlag={setUpdateFlag}
            refreshMealPlan={refreshMealPlan}
            setLoading={setLoading}
          ></Menu>
        )}
      </View>
      <Loader loading={loading}></Loader>
    </View>
  );
};

export default MenuScreen;
const styles = StyleSheet.create({
  headerTab: {
    flexDirection: "row",
    gap: 35,
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  Text: {
    color: "#518B1A",
    fontSize: 16,
  },
  TextActive: {
    color: "rgba(26, 26, 26, 0.50)",
    fontSize: 12,
  },
  tab: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
