import React from 'react';
import { Image, Pressable, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Index/Main Page
const IndexScreen = () => {
  const nav = useNavigation();
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>IndexScreen</Text>

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

//Profile Page
const ProfileScreen = () => (
  <View style={styles.layout}>
    <Text style={styles.title}>Profile</Text>
  </View>
);

//Setting Page
const SettingScreen = () => (
  <View style={styles.layout}>
    <Text style={styles.title}>Setting</Text>
  </View>
);

const Stack = createStackNavigator();

//Navigation Controls
export const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      // headerShown: false
        
    }}
  >
    <Stack.Screen
    name="Index"
    component={IndexScreen}
    // I was testing how to make the header invisible while being able to use the button - Alex
    // options={{
    //   headerStyle: {
    //     backgroundColor: '#654CE0'
    //   },
    //   headerRight: () => (
    //     <Button title="Update count" />
    //   ),
    // }}
    />
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
  },
  //Profile Button
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#654CE0",
    position: 'absolute',
    top: 150,
    left: 50,
  },
  //Setting Button
  settingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#654CE0",
    position: 'absolute',
    top: 150,
    right: 50,
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
});