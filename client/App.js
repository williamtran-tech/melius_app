import "react-native-gesture-handler";

// Import React and Component
import React, { useEffect } from "react";

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen";
import BottomNavigation from "./navigation/BottomNavigation";
const Stack = createStackNavigator();
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import * as Localization from "expo-localization";
import en from "./Services/translation/en.json";
import vi from "./Services/translation/vi.json";
import AuthenticationNavigation from "./navigation/AuthenticationNavigation";
import { Linking, StatusBar } from "react-native";
import { navigationRef } from "./Services/GoogleSingIn";
const App = () => {
  const handleRedirect = (event) => {
    // const url = event.url;
    const data = Linking.parse(event.url);
    console.log(data);
    // if (url && url.includes("YOUR_SUCCESS_REDIRECT_URL")) {
    //   // WebBrowser.dismissBrowser();
    //   // navigation.navigate("Home"); // Replace 'Home' with the name of the screen you want to navigate to
    // }
  };
  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    Linking.addEventListener("url", handleRedirect);

    // Remove the event listener when the component unmounts to avoid memory leaks
    return () => {
      Linking.removeEventListener("url", handleRedirect);
    };
  }, []);

  i18next.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi,
      },
    },
    lng: "en",
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false,
    },
  });
  return (
    <I18nextProvider i18n={i18next}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          {/* SplashScreen which will come once for 5 Seconds */}
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            // Hiding header for Splash Screen
            options={{ headerShown: false }}
          />
          {/* Auth Navigator: Include Login and Signup */}
          <Stack.Screen
            name="Auth"
            component={AuthenticationNavigation}
            options={{ headerShown: false }}
          />
          {/* Navigation Drawer as a landing page */}
          <Stack.Screen
            name="BottomNavigation"
            component={BottomNavigation}
            // Hiding header for Navigation Drawer
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigatorRoutes}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
};

export default App;
