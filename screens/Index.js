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
  constructor(props) {
    super(props);
    //To get the Current Date
    // var date = new Date().getDate();
  }
  date = new Date().getDate();
  month = new Date().getMonth() + 1; //To get the Current Month
  year = new Date().getFullYear(); //To get the Current Year
  hours = new Date().getHours(); //To get the Current Hours
  minutes = new Date().getMinutes(); //To get the Current Minutes
  seconds = new Date().getSeconds(); //To get the Current Seconds

  time = 0;
  width = 350;
  setTime(){
    this.time = 0;
    this.time += this.hours;
    //convert military time
    if(this.time < 12){
      //if morning
      this.time += 12;
    }
    else{
      //if pass noon
      this.time -= 12;
    }
    this.time += this.minutes / 60;
    this.time *= 350 / 24;
  }

  // currentTimeDisplay = () => {
  //   styles.currentTime.left = 100;
  // }

  displayCurrentTime = function() {
    this.setTime();
    return {
      width: 3,
      height: 40,
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 30,
      left: this.time,
    }
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
          {/* date: {this.date + "\n"}
          month: {this.month + "\n"}
          year: {this.year + "\n"}
          hours: {this.hours + "\n"}
          min: {this.min + "\n"}
          sec: {this.sec + "\n"} */}
        {/* <View style={styles.graphTime}>
          <Text style={styles.hours}>
            {this.hours-12}
          </Text>

          <Text style={styles.hours}>
            {this.hours-8}
          </Text>

          <Text style={styles.hours}>
            {this.hours-4}
          </Text>

          <Text style={styles.hours}>
            {this.hours}
          </Text>

          <Text style={styles.hours}>
            {this.hours+4}
          </Text>

          <Text style={styles.hours}>
            {this.hours+8}
          </Text>

          <Text style={styles.hours}>
            {this.hours+12}
          </Text>
        </View> */}
        {/* Graph */}
        <View style={styles.graphTime}>
          {/* Top part */}
          <View style={styles.topGraph}>
          </View>
          {/* Main part */}
          <View style={styles.mainGraph}>
            <View
              style={this.displayCurrentTime()}
              // onLayout={()=>{this.currentTimeDisplay}}
            >
              
            </View>
          </View>
          {/* Bottom time */}
          <View style={styles.bottomGraph}>
            <Text style={styles.hours}>
              12pm
            </Text>

            <Text style={styles.hours}>
              4pm
            </Text>

            <Text style={styles.hours}>
              8pm
            </Text>

            <Text style={styles.hours}>
              12am
            </Text>
            
            <Text style={styles.hours}>
              4am
            </Text>

            <Text style={styles.hours}>
              8am
            </Text>

            <Text style={styles.hours}>
              12pm
            </Text>
          </View>


        </View>
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
    topGraph: {
      width: 350,
      height: 100,
      backgroundColor: '#555',
    },
    mainGraph: {
      width: 350,
      height: 200,
      backgroundColor: 'grey',
    },
    bottomGraph: {
      width: 350,
      backgroundColor: 'grey',
      justifyContent: 'space-between',
      flexDirection:'row',
      flexWrap:'wrap',
    },
    graphTime: {
      width: 350,
      justifyContent: 'space-between',
      flexDirection:'row',
      flexWrap:'wrap',
    },
    hours: {

    },
  });