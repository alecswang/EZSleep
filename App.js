import React from "react";
import { SafeAreaView } from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import BottomNav from "./navigation/BottomNav.js";
import { createStackNavigator } from "@react-navigation/stack";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firestore, auth } from "./utilities/firebase";

import LoadingScreen from "./screens/Loading";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import CircadianCyclesScreen from "./articles/CircadianCycles.js";

import { update, ref, onValue, get, child } from "firebase/database";

import { Themes } from "./utilities/Themes";
import { lightColors } from "@rneui/themed";

const Stack = createStackNavigator();

//Entry Point
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightModeEnabled: false,
    };
  }
  updateTheme = () => {
    //update theme
    console.log("更新")
    this.setState({ lightModeEnabled: !this.state.lightModeEnabled }, () => {
      console.log("lightEnabled: " + this.state.lightModeEnabled);
      const updates = {};
      updates[[userID] + "/theme"] = this.state.lightModeEnabled
        ? "light"
        : "dark";
      update(ref(database), updates);
    });
  };

  render() {
    const { lightModeEnabled } = this.state;

    return (
      <>
        <SafeAreaView
          edges={["top"]}
          style={[
            {
              flex: 0,
              // backgroundColor: "#6A4CE5",
              backgroundColor: "#181A4F",
            },
            lightModeEnabled ? Themes.light : Themes.dark,
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
            lightModeEnabled ? Themes.light : Themes.dark,
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
                props={({ route }) => ({
                  updateTheme: this.updateTheme,
                  lightModeEnabled: lightModeEnabled
                })}
              />
              <Stack.Screen
                name="circadianCycles"
                component={CircadianCyclesScreen}
              />
            </Stack.Navigator>
            {/* <BottomNav></BottomNav> */}
          </NavigationContainer>
        </SafeAreaView>
      </>
    );
  }
}

export default App;
