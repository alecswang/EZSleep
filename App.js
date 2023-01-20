import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {firestore, auth} from './screens/firebase'

import SettingScreen from './screens/Setting';
import ProfileScreen from './screens/Profile';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import IndexScreen from './screens/Index';
import LoadingScreen from './screens/Loading';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC7dKQKFZrILaC7_BtowhFAzftrTijpyss",
//   authDomain: "ezsleep-e4c57.firebaseapp.com",
//   projectId: "ezsleep-e4c57",
//   storageBucket: "ezsleep-e4c57.appspot.com",
//   messagingSenderId: "493452915635",
//   appId: "1:493452915635:web:b6dce4c98a5af63941d1c6",
//   measurementId: "G-7LBEGZ9ZG7"
// };

console.log("hi");

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//for navigation
const Stack = createStackNavigator();

//Navigation Controls
const RootStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    initialRouteName="Login"
  >
    <Stack.Screen name="Index" component={IndexScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Setting" component={SettingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Loading" component={LoadingScreen} />
  </Stack.Navigator>
);

//Entry Point
class App extends React.Component{
  render(){
    return (
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    );
  }
};

export default App;

