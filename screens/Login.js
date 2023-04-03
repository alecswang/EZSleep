import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";

import firebase from "firebase/compat/app";
import { firestore, auth } from "../utilities/firebase";

import { AsyncStorage } from "react-native";

//Profile Page
class LoginScreen extends React.Component {
  state = { email: "", password: "", errorMessage: null };

  handleLogin = () => {
    const { email, password } = this.state;
    console.log("login");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.props.navigation.navigate("Home");
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.layout}>
        <Text style={styles.title}>Login</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        {/* <TextInput
          placeholder={'Username'}
          style={styles.input}
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
        /> */}
        <TextInput
          placeholder={"Email"}
          autoCapitalize="none"
          style={styles.input}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder={"Password"}
          secureTextEntry={true}
          style={styles.input}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />

        {/* Navigate to Index Page, temp, needa link to database and add logic*/}
        <Pressable
          style={styles.button}
          onPress={this.handleLogin}
          // onPress={this.onLogin.bind(this)}
        >
          <Text style={styles.text}>Login</Text>
        </Pressable>
        {/* Navigate to Register Page */}
        <Pressable
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.text}>New User</Text>
        </Pressable>
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  //general Layout
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#654CE0",
  },
  //Testing purpose
  title: {
    fontSize: 32,
    marginBottom: 16,
    position: "absolute",
    top: 70,
    justifyContent: "center",
    color: "#fff",
  },
  //Back Button
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    top: 70,
    left: 20,
    backgroundColor: "gold",
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
    borderWidth: 3,
    borderColor: "grey",
    marginBottom: 30,
    backgroundColor: "white",
  },
  button: {
    width: 100,
    height: 44,
    padding: 5,
    borderWidth: 3,
    borderColor: "grey",
    marginBottom: 20,
    backgroundColor: "grey",
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
