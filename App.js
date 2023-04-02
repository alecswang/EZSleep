import React from "react";
import { SafeAreaView } from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import BottomNav from "./navigation/BottomNav.js";
import { createStackNavigator } from "@react-navigation/stack";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firestore, auth } from "./screens/firebase";

import LoadingScreen from "./screens/Loading";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import circadianCycles from "./articles/circadianCycles";

const Stack = createStackNavigator();

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
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="Loading"
            >
              <Stack.Screen name="Loading" component={LoadingScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Home" component={BottomNav} />
              <Stack.Screen name="circadianCycles" component={circadianCycles} />
            </Stack.Navigator>
            {/* <BottomNav></BottomNav> */}
          </NavigationContainer>
        </SafeAreaView>
      </>
    );
  }
}

export default App;
