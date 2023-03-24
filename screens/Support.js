import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



//Profile Page
const ProfileScreen = () => {
    const nav = useNavigation();
    return (
    <View style={styles.layout}>
      <Text style={styles.title}>Support</Text>
      {/* Nav to Index Page */}
      <Pressable 
        onPress={()=>nav.navigate('Index')}
        style={styles.backButton}
      >
        <Image
          style={styles.backImage}
          source={require('../assets/back-arrow.png')}
        ></Image>
      </Pressable>
    </View>
    )
};

export default ProfileScreen;

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
        top: 70,
        justifyContent: "center",
        color: '#fff',
    },
    //Back Button
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#654CE0",
        position: 'absolute',
        top: 70,
        right: 20,
    },
    //Images
  backImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});