import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { auth, database } from "./firebase";
let uID = auth.currentUser.uid;
import { update, ref, onValue } from "firebase/database";

import { themes } from "../utilities/themes";

let currentTheme = ref(database, uID + "/theme");
if (currentTheme) {
  onValue(currentTheme, (snapshot) => {
    currentTheme = snapshot.val();
    console.log(currentTheme);
  });
}

//Profile Page
const ProfileScreen = () => {
  const nav = useNavigation();
  return (
    <View
      style={[
        styles.layout,
        currentTheme == "light" ? themes.light : themes.dark,
      ]}
    >
      <Text style={styles.title}>Support</Text>
    </View>
  );
};

export default ProfileScreen;

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
