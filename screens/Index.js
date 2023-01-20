import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import firebase from 'firebase/compat/app';
import {firestore, auth} from './firebase'

import { NavigationContainer, useNavigation } from '@react-navigation/native';

//Index/Main Page
class IndexScreen extends React.Component {
  state = { currentUser: null };
  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  render(){
    return (
      <View style={styles.layout}>
        {/* <Text style={styles.title}>EZ Sleep </Text> */}
  
        {/* Nav to Profile Page */}
        <Pressable 
          onPress={()=>this.props.navigation.navigate('Profile')}
          style={styles.profileButton}
        >
          <Image
            style={styles.iconImage}
            source={require('../assets/Profile.png')}
          ></Image>
        </Pressable>
  
        {/* Nav to Setting Page */}
        <Pressable 
          onPress={()=>this.props.navigation.navigate('Setting')}
          style={styles.settingButton}
        >
          <Image
            style={styles.iconImage}
            source={require('../assets/Setting.png')}
          ></Image>
        </Pressable>
  
        {/* Nav to Login Page */}
        <Pressable 
          onPress={()=>this.props.navigation.navigate('Login')}
          style={styles.loginButton}
        >
          <Image
            style={styles.iconImage}
            source={require('../assets/favicon.png')}
          ></Image>
        </Pressable>
      </View>
    );
  }
};
  
  export default IndexScreen;

//Stylesheet
const styles = StyleSheet.create({
    //general Layout
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#654CE0",
    },
    //Testing purpose
    title: {
      fontSize: 32,
      marginBottom: 16,
      position: "absolute",
      top: 50,
      justifyContent: "center",
      color: '#ff'
    },
    //Setting Button
    settingButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#654CE0",
      position: 'absolute',
      top: 100,
      right: 50,
    },
    //Profile Button
    profileButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#654CE0",
      position: 'absolute',
      top: 100,
      left: 50,
    },
    //Login Button
    loginButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#654CE0",
      position: 'absolute',
      top: 200,
    },
    //Images
    iconImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    // Light/Dark Mode
    lightContainer: {
      backgroundColor: '#d0d0c0',
    },
    darkContainer: {
      backgroundColor: '#242c40',
    },
    lightThemeText: {
      color: '#242c40',
    },
    darkThemeText: {
      color: '#d0d0c0',
    },
  });