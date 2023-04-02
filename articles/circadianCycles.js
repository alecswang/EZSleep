import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { auth, database } from "../screens/firebase";
let uID;
if (auth.currentUser) {
  uID = auth.currentUser.uid;
}
import { update, ref, onValue } from "firebase/database";

import { Themes } from "../utilities/Themes";


let currentTheme = ref(database, uID + "/theme");
if (currentTheme) {
  onValue(currentTheme, (snapshot) => {
    currentTheme = snapshot.val();
    console.log(currentTheme);
  });
}

//Learn Page
const LearnScreen = (props) => {
  const nav = useNavigation();
  return (
    <View
      style={[
        styles.layout,
        props.lightModeEnabled ? Themes.light : Themes.dark,
      ]}
    >
      <Text style={styles.title}>Circadian Cycles</Text>
    </View>
  );
};

export default LearnScreen;

const styles = StyleSheet.create({
  //general Layout
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000777",
  },
  //Testing purpose
  title: {
    fontSize: 32,
    marginBottom: 16,
    position: "absolute",
    top: 70,
    justifyContent: "center",
    color: "#fff",
  },
  //Back Button
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#654CE0",
    position: "absolute",
    top: 70,
    right: 20,
  },
  //Images
  backImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
