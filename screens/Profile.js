import React, { useEffect, useState, useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View, Switch, ScrollView } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../components/Header";
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

import { Themes } from "../utilities/Themes";
import { ThemeContext } from "../utilities/ThemeContext";


import { auth, database } from "../utilities/firebase";
import { update, ref } from "firebase/database";
let uID;
if (auth.currentUser) {
  uID = auth.currentUser.uid;
}

//update firebase
const updates = {};
updates[[uID] + "/theme"] = "dark";
update(ref(database), updates);

const ProfileScreen = (props) => {
  // Back arrow button
  const nav = useNavigation();
  const {theme, updateTheme } = useContext(ThemeContext);

  const [isActive, setIsActive] = useState(theme == "light");

  const handleThemeChange= (value) => {
    updateTheme(value ? "light" : "dark", true)
    setIsActive((previousState) => !previousState)
  }

  console.log("Profile")
  console.log(theme)

  // general code used for animations
  const progress = useDerivedValue(() => {
    // return props.lightModeEnabled ? withTiming(1) : withTiming(0);
    return withTiming(1);

  });
  // Animation for background
  const backgroundAnimation = useAnimatedStyle(() => {
    console.log("gfasfasfwgea")
    console.log(props)

    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Themes.dark.backgroundColor, Themes.light.backgroundColor]
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
      [Themes.dark.color, Themes.light.color]
    );
    return {
      color,
    };
  });

  // useEffect(() => {
  //   console.log('Theme updated');
  // }, [theme]);

  const SWITCH_TRACK_COLOR = {
    true: "#fff096",
    false: "#81b0ff",
  };

  const SWITCH_THUMB_COLOR = {
    true: "#000000",
    false: "#ffffff",
  };

  // render(){
  return (
    <Animated.View style={[styles.layout, backgroundAnimation]}>
      {/* <Header></Header> */}
      <View style={[styles.scrollViewContainer]}>
      <ScrollView contentContainerStyle={styles.scrollInnerContainer}>
        
        {/* title */}
      <View style={styles.title}>
        <Animated.Text style={[styles.text, textAnimation]}>
          PROFILE
        </Animated.Text>
      </View>
      <View style={styles.options}>
        {/* Profile Container */}
        <View style={[styles.container, styles.profileContainer]}>
          <Image
            source={require("../assets/profile.png")}
            style={styles.pfp}
          ></Image>
          <Animated.Text style={[styles.userNameText, textAnimation]}>
            {props.userName}
          </Animated.Text>
        </View>
        {/* dividing line */}
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderWidth: 1,
          }}
        />
        {/* Theme toggle container */}
        <View style={styles.container}>
          <Animated.Text style={[styles.optionText, textAnimation]}>
            Light mode
          </Animated.Text>
          <Switch
            value={isActive}
            onValueChange={(value)=>handleThemeChange(value)}
            trackColor={SWITCH_TRACK_COLOR}
            // thumbColor={lightEnabled ? '#3e3e3e' : "#fff096"}
            ios_backgroundColor="#3e3e3e"
            style={styles.switch}
          />
        </View>
        {/* dividing line */}
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderWidth: 1,
          }}
        />
        {/* Melatonin toggle container */}
        <View style={styles.container}>
          <Animated.Text style={[styles.optionText, textAnimation]}>
            Melatonin
          </Animated.Text>
          <Switch
            value={props.melatoninEnabled}
            onValueChange={() => props.updateItem("melatonin")}
            trackColor={SWITCH_TRACK_COLOR}
            // thumbColor={lightEnabled ? '#3e3e3e' : "#fff096"}
            ios_backgroundColor="#3e3e3e"
            style={styles.switch}
          />
        </View>
        {/* dividing line */}
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderWidth: 1,
          }}
        />
        {/* Caffine toggle container */}
        <View style={styles.container}>
          <Animated.Text style={[styles.optionText, textAnimation]}>
            Caffine
          </Animated.Text>
          <Switch
            value={props.caffineEnabled}
            onValueChange={() => props.updateItem("caffine")}
            trackColor={SWITCH_TRACK_COLOR}
            // thumbColor={lightEnabled ? '#3e3e3e' : "#fff096"}
            ios_backgroundColor="#3e3e3e"
            style={styles.switch}
          />
        </View>
        {/* dividing line */}
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderWidth: 1,
          }}
        />
        {/* Sleep Needed */}
        <View style={styles.container}>
          <Animated.Text style={[styles.optionText, textAnimation]}>
            My Sleep Need
          </Animated.Text>
        </View>
        {/* dividing line */}
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderWidth: 1,
          }}
        />
        {/* Wake Time Goal */}
        <View style={styles.container}>
          <Animated.Text style={[styles.optionText, textAnimation]}>
            Wake Time Goal
          </Animated.Text>
        </View>
        {/* dividing line */}
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderWidth: 1,
          }}
        />
        {/* <TimePicker
          value="06:00 PM"
          clockIcon={null}
          disableClock
          format="hh:mm a"
        /> */}
      </View>
      </ScrollView>
      </View>
    </Animated.View>
  );
  // }
};
export default ProfileScreen; 

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
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  title: {
    marginTop: 30,
    marginBottom: 20,
  },
  //general option Text
  optionText: {
    fontSize: 20,
    left: 40,
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
    width: "100%",
    fontSize: 20,
  },
  //general container
  container: {
    height: 110,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    // justifyContent: "center",
  },
  profileContainer: {
    height: 140,
    justifyContent: "space-around",
  },
  pfp: {
    width: 70,
    height: 70,
  },
  userNameText: {
    fontSize: 20,
  },
  scrollViewContainer:{
    height: 750,
    overflow: "hidden",
    width: "100%",
  },
  scrollInnerContainer:{
    alignItems: "center",
    paddingBottom: 1000,
  },
});
