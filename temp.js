import React from "react";
import { SafeAreaView } from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import BottomNav from "./navigation/BottomNav";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firestore, auth } from "./screens/firebase";

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
            <BottomNav></BottomNav>
          </NavigationContainer>
        </SafeAreaView>
      </>
    );
  }
}

export default App;
