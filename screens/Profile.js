import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View, Switch } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  interpolateColor,
  useDerivedValue,
} from "react-native-reanimated";
// import {
//   backgroundAnimation,
//   textAlign,
//   toggleSwitch,
//   darkEnabled,
// } from "../utilities/themeChange";

// import {
//   getDatabase,
//   ref,
//   set,
//   onValue,
//   update,
// } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { auth, database } from "./firebase";
import { update, ref } from "firebase/database";
let uID = auth.currentUser.uid;

//update firebase
const updates = {};
updates[[uID] + "/theme"] = "dark";
update(ref(database), updates);

// class SettingScreen extends React.Component {
const SettingScreen = () => {
  // Dark/Light Mode
  const [darkEnabled, setdarkEnabled] = useState(false);
  const toggleSwitch = () => {
    setdarkEnabled((previousState) => !previousState);
    console.log("darkEnabled: " + darkEnabled);
    const updates = {};
    updates[[uID] + "/theme"] = darkEnabled ? "dark" : "light";
    update(ref(database), updates);
  };

  // Back arrow button
  const nav = useNavigation();

  // general code used for animations
  const progress = useDerivedValue(() => {
    return darkEnabled ? withTiming(1) : withTiming(0);
  });
  // Animation for background
  const backgroundAnimation = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );
    return {
      backgroundColor,
    };
  });
  // Animation for textColors
  const textAnimation = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );
    return {
      color,
    };
  });

  const SWITCH_TRACK_COLOR = {
    true: "#81b0ff",
    false: "#767577",
  };

  const SWITCH_THUMB_COLOR = {
    true: "#000",
    false: "#fff",
  };

  // render(){
  return (
    <Animated.View style={[styles.layout, backgroundAnimation]}>
      <View style={styles.options}>
        <Animated.Text
          style={[styles.lightDarkText, styles.text, textAnimation]}
        >
          Light mode
        </Animated.Text>
        <Switch
          value={darkEnabled}
          onValueChange={toggleSwitch}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={SWITCH_THUMB_COLOR}
          ios_backgroundColor="#3e3e3e"
          style={styles.switch}
        />
      </View>
    </Animated.View>
  );
  // }
};
export default SettingScreen;

// Colors for switching themes
const Colors = {
  dark: {
    background: "#654CE0",
    text: "#fff",
  },
  light: {
    background: "#7974E8",
    text: "#000",
  },
};

//Stylesheet
const styles = StyleSheet.create({
  //general Layout
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  //general Text
  text: {
    fontSize: 20,
  },
  //Back Button
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    top: 70,
    left: 20,
  },
  //Images
  backImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  //Switch
  switch: {
    position: "absolute",
    right: 40,
  },
  //Options: light/dark text
  lightDarkText: {
    position: "absolute",
    left: 40,
  },
  // Options container
  options: {
    position: "absolute",
    top: 230,
    width: "100%",
    fontSize: 20,
  },
});
