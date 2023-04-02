import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreen from "../screens/Profile";
import IndexScreen from "../screens/Index";
import GamifyScreen from "../screens/Gamify";
import SupportScreen from "../screens/Support";
import LoadingScreen from "../screens/Loading";
import LearnScreen from "../screens/Learn";

import { auth, database } from "../screens/firebase";
import { update, ref, onValue, get, child } from "firebase/database";
let userID;
if (auth.currentUser) {
  userID = auth.currentUser.uid;
}
let userName = ref(database, userID + "/userName");
onValue(userName, async (snapshot) => {
  userName = await snapshot.val();
});

//for navigation
const Tab = createBottomTabNavigator();

//Entry Point
class BottomNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightModeEnabled: false,
    };
  }

  updateTheme = () => {
    //update theme
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
      // <Stack.Navigator>
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
      <>
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
              ...styles.shadow,
            },
          }}
          initialRouteName="Loading"
        >
          <Tab.Screen
            name="Index"
            children={() => <IndexScreen lightModeEnabled={lightModeEnabled} />}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    top: 3,
                  }}
                >
                  <Image
                    source={require("../assets/graph.png")}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? "#6A4CE5" : "#748c94",
                    }}
                  />
                  <Text
                    style={{
                      tintColor: focused ? "#6A4CE5" : "#748c94",
                      fontSize: 12,
                    }}
                  >
                    HOME
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Gamify"
            children={() => (
              <GamifyScreen lightModeEnabled={lightModeEnabled} />
            )}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    top: 3,
                  }}
                >
                  <Image
                    source={require("../assets/gamify.png")}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? "#6A4CE5" : "#748c94",
                    }}
                  />
                  <Text
                    style={{
                      tintColor: focused ? "#6A4CE5" : "#748c94",
                      fontSize: 12,
                    }}
                  >
                    GAME
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Learn"
            children={() => (
              <LearnScreen lightModeEnabled={lightModeEnabled} />
            )}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    top: 3,
                  }}
                >
                  <Image
                    source={require("../assets/light-bulb.png")}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? "#6A4CE5" : "#748c94",
                    }}
                  />
                  <Text
                    style={{
                      tintColor: focused ? "#6A4CE5" : "#748c94",
                      fontSize: 12,
                    }}
                  >
                    Learn
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name={"Profile"}
            children={() => (
              <ProfileScreen
                updateTheme={this.updateTheme}
                lightModeEnabled={lightModeEnabled}
                userName={userName}
              />
            )}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    top: 3,
                  }}
                >
                  <Image
                    source={require("../assets/profile.png")}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? "#6A4CE5" : "#748c94",
                    }}
                  />
                  <Text
                    style={{
                      tintColor: focused ? "#6A4CE5" : "#748c94",
                      fontSize: 12,
                    }}
                  >
                    PROFILE
                  </Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomNav;
