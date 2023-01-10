import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, Switch } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Setting Page
  const backImg = require('./assets/back-arrow.png');
  
const SettingScreen = () => {

  //Dark/Light Mode
    const [darkEnabled, setdarkEnabled] = useState(false);
    const toggleSwitch = () => setdarkEnabled(previousState => !previousState);

  // Back arrow button
    const nav = useNavigation();

  return (
    <View style={[styles.layout, darkEnabled && styles.layoutDark]}>
      <View style={styles.options}>
        <Text style={[styles.ligtDrkText, styles.text, darkEnabled && styles.textDark]}>Light/Dark Mode Toggle</Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={darkEnabled ? "#fff" : "#fff"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={darkEnabled}
        />
      </View>

      {/* Nav to Index Page */}
      <Pressable 
        onPress={()=>nav.navigate('Index')}
        style={styles.backButton}
      >
      <Image
        style={styles.backImage}
        source={backImg}
      ></Image>
      </Pressable>
      {/* DarkMode Switch */}
    </View>
  )
};
  
  export default SettingScreen;

//Stylesheet
const lightColor1 = "#7974E8";
const white = "#000";
const darkColor1 = "#654CE0";
const grey = "#d1d1d1";
const styles = StyleSheet.create({
  //general Layout
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightColor1,
  },
  //general Text
  text: { 
    fontSize: 20,
    color: white,
  },
  //Back Button
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    top: 70,
    left: 20,
  },
  //Images
  backImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  //Switch
  switch: {
    position: 'absolute',
    right: 40,
  },
  //Options: light/dark text
  ligtDrkText: {
    position: 'absolute',
    left: 40,
  },
  //options container
  options: {
    position: 'absolute',
    top: 230,
    width: '100%',
    fontSize: 20,
  },
  //layout dark theme
  layoutDark: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkColor1,
  },
  textDark: {
    fontSize: 20,
    color: grey,
  }
});