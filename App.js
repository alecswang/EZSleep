import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SettingScreen from './Setting';
import ProfileScreen from './Profile';

//Index/Main Page
const IndexScreen = () => {
  const nav = useNavigation();
  return (
    <View style={styles.layout}>
      {/* <Text style={styles.title}>EZ Sleep </Text> */}

      {/* Nav to Profile Page */}
      <Pressable 
        onPress={()=>nav.navigate('Profile')}
        style={styles.profileButton}
      >
        <Image
          style={styles.profileImage}
          source={require('./assets/Profile.png')}
        ></Image>
      </Pressable>

      {/* Nav to Setting Page */}
      <Pressable 
        onPress={()=>nav.navigate('Setting')}
        style={styles.settingButton}
      >
        <Image
          style={styles.settingImage}
          source={require('./assets/Setting.png')}
        ></Image>
      </Pressable>
    </View>
  );
};

const Stack = createStackNavigator();

//Navigation Controls
export const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name="Index" component={IndexScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Setting" component={SettingScreen} />
  </Stack.Navigator>
);

//Entry Point
const App = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

export default App;

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
  //Images
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  settingImage: {
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