import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import BottomNav from "./navigation/BottomNav.js";
import { createStackNavigator } from "@react-navigation/stack";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import LoadingScreen from "./screens/Loading";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import CircadianCyclesScreen from "./articles/CircadianCycles.js";

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  interpolateColor,
  useDerivedValue,
} from "react-native-reanimated";

import { auth, database } from "./utilities/firebase";
import { update, ref, onValue, get, child } from "firebase/database";

import { Themes } from "./utilities/Themes";
import { ThemeContext } from "./utilities/ThemeContext";
// import { lightColors } from "@rneui/themed";

//get user ID
let userID = null;
if (auth.currentUser) {
  userID = auth.currentUser.uid;
}
auth.onAuthStateChanged(function (currentUser) {
  if (currentUser) {
    userID = auth.currentUser.uid;
    // User is signed in.
  } else {
    console.log("no user signed in");
    // No user is signed in.
  }
});

const Stack = createStackNavigator();

//Entry Point
function App() {
  const [theme, setTheme] = useState("dark");

  //update theme
  const updateTheme = (newTheme) => {
    // let mode;
    console.log("update theme");
    setTheme(newTheme);
  };

  useEffect(() => {
    const updates = {};
    updates[[userID] + "/theme"] = theme;
    update(ref(database), updates);
  }, [userID, theme, update]);

  // const [isActive, setIsActive] = useState(theme == "light");

  // general code used for animations
  const progress = useDerivedValue(() => {
    return theme=='light' ? withTiming(1) : withTiming(0);
  });

  // Animation for background
  const backgroundAnimation = useAnimatedStyle(() => {
    let prevColor = Themes.dark.backgroundColor;
    let newColor = Themes.light.backgroundColor;
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [prevColor, newColor]
    );
    console.log("kfasiofjaoijvsa: " + progress.value)
    console.log("kfasiofjaoijvsa: " + backgroundColor)
    console.log("kfasiofjaoijvsa: " + backgroundColor.toString(16).slice(2))
    return {
      backgroundColor,
    };
  });

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <SafeAreaView
        edges={["top"]}
        style={[
          {
            flex: 0,
            // backgroundColor: "#6A4CE5",
            backgroundColor: ("#" + backgroundAnimation.toString(16).slice(2)),
          // ...backgroundAnimation,
          },
          // backgroundAnimation
        ]}
      ></SafeAreaView>
      <SafeAreaView
        edges={["left", "right", "bottom"]}
        style={[
          {
            flex: 1,
            // backgroundColor: "#6A4CE5",
            backgroundColor: "#181A4F",
          },
          Themes[theme],
        ]}
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Loading"
          >
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="Home"
              component={BottomNav}
              initialParams={
                {
                  // updateTheme: updateTheme,
                  // lightModeEnabled: lightModeEnabled,
                }
              }
            />
            <Stack.Screen
              name="circadianCycles"
              component={CircadianCyclesScreen}
            />
          </Stack.Navigator>
          {/* <BottomNav></BottomNav> */}
        </NavigationContainer>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

export default App;
