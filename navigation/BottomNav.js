import React, {useContext, useState} from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreen from "../screens/Profile";
import IndexScreen from "../screens/Index";
import GamifyScreen from "../screens/Gamify";
import SupportScreen from "../screens/Support";
import LoadingScreen from "../screens/Loading";
import LearnScreen from "../screens/Learn";

import { ThemeContext } from "../utilities/ThemeContext";
import { Themes } from "../utilities/Themes";

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
const BottomNav = (props) => {
  const {theme} = useContext(ThemeContext);
  const {melatoninEnabled} = useState(false);
  const {caffineEnabled} = useState(false);
  console.log("主题")
  console.log(theme)
    // console.log("BottomNav Trust me")
    // console.log(this.props.route.params)
    // console.log(this.props.route.params.lightModeEnabled)

  // updateTheme = () => {
  //   //update theme
  //   this.setState({ lightModeEnabled: !this.state.lightModeEnabled }, () => {
  //     console.log("lightEnabled: " + this.state.lightModeEnabled);
  //     const updates = {};
  //     updates[[userID] + "/theme"] = this.state.lightModeEnabled
  //       ? "light"
  //       : "dark";
  //     update(ref(database), updates);
  //   });
  // };

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

    return (
      <>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              elevation: 0,
              backgroundColor: "#181A4F",
              // borderBottomLeftRadius: 0,
              // borderBottomRightRadius: 0,
              // borderTopLeftRadius: 20,
              // borderTopRightRadius: 20,
              borderTopWidth: 0,
              height: 60,
              ...styles.shadow,
              ...Themes[theme],
            },
          }}
          initialRouteName="Loading"
        >
          <Tab.Screen
            name="Index"
            children={() => (
              <IndexScreen
                theme={theme}
                userID={userID}
              />
            )}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.container}>
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
                    style={[
                      {
                        // tintColor: focused ? "#6A4CE5" : "#748c94",
                        fontSize: 12,
                      },
                      Themes[theme],
                    ]}
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
              <GamifyScreen theme={theme} />
            )}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.container}>
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
                    style={[
                      {
                        // tintColor: focused ? "#6A4CE5" : "#748c94",
                        fontSize: 12,
                      },
                      Themes[theme],
                    ]}
                  >
                    GAME
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Learn"
            children={() => <LearnScreen theme={theme} />}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.container}>
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
                    style={[
                      {
                        // tintColor: focused ? "#6A4CE5" : "#748c94",
                        fontSize: 12,
                      },
                      Themes[theme],
                    ]}
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
                // updateTheme={updateTheme}
                updateItem={updateItem}
                theme={theme}
                melatoninEnabled={melatoninEnabled}
                caffineEnabled={caffineEnabled}
                userName={userName}
              />
            )}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.container}>
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
                    style={[
                      {
                        // tintColor: focused ? "#6A4CE5" : "#748c94",
                        fontSize: 12,
                      },
                      Themes[theme],
                    ]}
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
  container: {
    alignItems: "center",
    justifyContent: "center",
    top: 3,
  },
});

export default BottomNav;
