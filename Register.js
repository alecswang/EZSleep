import React from 'react';
import { Image, Pressable, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Profile Page
const RegisterScreen = () => {
    const nav = useNavigation();
    return (
    <View style={styles.layout}>
        <Text style={styles.title}>Register</Text>
        <TextInput
        //   value={this.state.username}
        //   onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
        //   value={this.state.password}
        //   onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Register'}
          style={styles.input}
        //   onPress={this.onLogin.bind(this)}
        />

      {/* Nav to Index Page */}
      <Pressable 
        onPress={()=>nav.navigate('Index')}
        style={styles.backButton}
      >
        <Image
          style={styles.backImage}
          source={require('./assets/back-arrow.png')}
        ></Image>
      </Pressable>
    </View>
    )
};

export default RegisterScreen;

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
  // input
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 50,
  },
});