import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Fragment,
} from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firestore, auth } from "./screens/firebase";

import ProfileScreen from "./screens/Profile";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import IndexScreen from "./screens/Index";
import LoadingScreen from "./screens/Loading";
import GamifyScreen from "./screens/Gamify";
import SupportScreen from "./screens/Support";

//for navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Navigation Controls
const RootStack = () => (
  // <Stack.Navigator
  //   screenOptions={{
  //     headerShown: false,
  //   }}
  //   initialRouteName="Loading"
  // >
  //   <Stack.Screen name="Index" component={IndexScreen} />
  //   <Stack.Screen name="Profile" component={ProfileScreen} />
  //   <Stack.Screen name="Login" component={LoginScreen} />
  //   <Stack.Screen name="Register" component={RegisterScreen} />
  //   <Stack.Screen name="Loading" component={LoadingScreen} />
  //   <Stack.Screen name="Gamify" component={GamifyScreen} />
  //   <Stack.Screen name="Support" component={SupportScreen} />
  // </Stack.Navigator>
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: "#ffffff",
        borderRadius: 15,
        height: 90,
      },
    }}
    tabBarOptions={{}}
    initialRouteName="Loading"
  >
    <Tab.Screen name="Index" component={IndexScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Login" component={LoginScreen} />
    <Tab.Screen name="Register" component={RegisterScreen} />
    <Tab.Screen name="Loading" component={LoadingScreen} />
    <Tab.Screen name="Gamify" component={GamifyScreen} />
    <Tab.Screen name="Support" component={SupportScreen} />
  </Tab.Navigator>
);

//Entry Point
class App extends React.Component {
  render() {
    return (
      <>
        <SafeAreaView
          edges={["top"]}
          style={{
            flex: 0,
            backgroundColor: "#414141",
          }}
        ></SafeAreaView>
        <SafeAreaView
          edges={["left", "right", "bottom"]}
          style={{
            flex: 1,
            backgroundColor: "#6A4CE5",
          }}
        >
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </SafeAreaView>
      </>
    );
  }
}

export default App;
