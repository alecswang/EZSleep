import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreen from "../screens/Profile";
import IndexScreen from "../screens/Index";
import GamifyScreen from "../screens/Gamify";
import SupportScreen from "../screens/Support";
import LoadingScreen from "../screens/Loading";
import LearnScreen from "../screens/Learn";

import { auth, database } from "../utilities/firebase";
import { update, ref, onValue, get, child } from "firebase/database";
//get user ID
let userID = null;
if (auth.currentUser) {
  userID = auth.currentUser.uid;
}
auth.onAuthStateChanged(function (currentUser) {
  if (currentUser) {
    userID = auth.currentUser.uid;
    // User is signed in.
  } else {
    console.log("no user signed in");
    // No user is signed in.
  }
});

const userNameRef = ref(database, userID + "/userName");
let userName = null;
onValue(userNameRef, (snapshot) => {
  userName = snapshot.val();
});

//for navigation
const Tab = createBottomTabNavigator();

//Entry Point
class BottomNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightModeEnabled: false,
      melatoninEnabled: false,
      caffineEnabled: false,
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

  updateItem = (itemName) => {
    //update item
    itemName += "Enabled";
    this.setState({ [itemName]: !this.state[itemName] }, () => {
      console.log(itemName + this.state[itemName]);
      const updates = {};
      updates[[userID] + "/" + itemName] = this.state[itemName]
        ? "true"
        : "false";
      update(ref(database), updates);
    });
  };

  render() {
    const { lightModeEnabled, melatoninEnabled, caffineEnabled } = this.state;
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
            children={() => (
              <IndexScreen
                lightModeEnabled={lightModeEnabled}
                userID={userID}
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
                      // tintColor: focused ? "#6A4CE5" : "#748c94",
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
                      // tintColor: focused ? "#6A4CE5" : "#748c94",
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
            children={() => <LearnScreen lightModeEnabled={lightModeEnabled} />}
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
                updateItem={this.updateItem}
                lightModeEnabled={lightModeEnabled}
                melatoninEnabled={melatoninEnabled}
                caffineEnabled={caffineEnabled}
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
