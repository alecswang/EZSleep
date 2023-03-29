import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Themes } from "../utilities/Themes";

//Profile Page
const GamifyScreen = (props) => {
  const nav = useNavigation();
  return (
    <View
      style={[
        styles.layout,
        props.lightModeEnabled ? Themes.light : Themes.dark,
      ]}
    >
      <Text style={styles.title}>Gamify</Text>
    </View>
  );
};

export default GamifyScreen;

const styles = StyleSheet.create({
  //general Layout
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#654CE0",
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
