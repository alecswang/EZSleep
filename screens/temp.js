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
let uID;
if (auth.currentUser) {
  uID = auth.currentUser.uid;
}

//update firebase
const updates = {};
updates[[uID] + "/theme"] = "dark";
update(ref(database), updates);

// class SettingScreen extends React.Component {
class SettingScreen extends React.Component {
  // Dark/Light Mode
  constructor(props) {
    super(props);
    this.state = {
      lightEnabled: false,
    };
    console.log("legit" + this.state.lightEnabled)
    this.toggleSwitch = this.toggleSwitch.bind(this)
    // this.progress = this.progress.bind(this)
  }

  toggleSwitch = () => {
    this.setState({ darkEnabled: !darkEnabled });
    console.log("lightEnabled: " + this.state.lightEnabled);
    const updates = {};
    updates[[uID] + "/theme"] = this.state.lightEnabled ? "dark" : "light";
    update(ref(database), updates);
    //need to render here
  };

  // Back arrow button

  // general code used for animations
  progress = useDerivedValue(() => {
    // return this.state.lightEnabled ? withTiming(1) : withTiming(0);
    return 0;
  });
  // Animation for background
  backgroundAnimation = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.dark.background, Colors.light.background]
    );
    return {
      backgroundColor,
    };
  });
  // Animation for textColors
  textAnimation = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.dark.text, Colors.light.text]
    );
    return {
      color,
    };
  });

  SWITCH_TRACK_COLOR = {
    true: "#fff096",
    false: "#81b0ff",
  };

  SWITCH_THUMB_COLOR = {
    true: "#000000",
    false: "#ffffff",
  };

  render(){
    const { lightEnabled } = this.state;
  return (
    <Animated.View style={[styles.layout, this.backgroundAnimation]}>
      <View style={styles.options}>
        <Animated.Text
          style={[styles.lightDarkText, styles.text, this.textAnimation]}
        >
          {this.props.userName}
        </Animated.Text>
        <Animated.Text
          style={[styles.lightDarkText, styles.text, this.textAnimation]}
        >
          Light mode
        </Animated.Text>
        <Switch
          value={lightEnabled}
          onValueChange={this.toggleSwitch}
          trackColor={this.SWITCH_TRACK_COLOR}
          // thumbColor={lightEnabled ? '#3e3e3e' : "#fff096"}
          ios_backgroundColor="#3e3e3e"
          style={styles.switch}
        />
      </View>
    </Animated.View>
  );
  }
};
export default SettingScreen;

// Colors for switching themes
const Colors = {
  dark: {
    background: "#6A4CE5",
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
