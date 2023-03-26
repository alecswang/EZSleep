import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Fragment,
} from "react-native";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Graph from "../components/Graph";
import ChangeTimeFramePopup from "../components/ChangeTimeFramePopup";

import firebase from "firebase/compat/app";

import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { auth, database } from "../screens/firebase";
import { update, ref, onValue } from "firebase/database";
let uID;
if (auth.currentUser) {
  uID = auth.currentUser.uid;
}

let st = ref(database, [uID] + "/startTime");
onValue(st, (snapshot) => {
  st = snapshot.val();
});
console.log(uID);
console.log(st);

let et = ref(database, [uID] + "/endTime");
onValue(et, (snapshot) => {
  et = snapshot.val();
});

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
    this.state = {
      startTime: st,
      endTime: et,
    };
  }

  // currentTimeDisplay = () => {
  //   styles.currentTime.left = 100;
  // }

  updateTime = () => {
    st = ref(database, [uID] + "/startTime");
    onValue(st, (snapshot) => {
      st = snapshot.val();
    });
    console.log(uID);
    console.log(st);

    et = ref(database, [uID] + "/endTime");
    onValue(et, (snapshot) => {
      et = snapshot.val();
    });
  
    //update state
    this.setState({startTime: st})
    this.setState({staendTimertTime: et})
    console.log("UPDATEtiansdajfnaojfgbas")
  }

  render() {
    const { startTime, endTime } = this.state;
    console.log("FASFSAFAFWWF" + startTime)
    return (
      <View style={styles.layout}>
        <Header></Header>
        {/* sun moon sun indicator */}
        <View style={styles.indicatorContainer}>
          <Image
            style={styles.halfSunImage}
            source={require("../assets/sunRight.png")}
          />
          <Image
            style={styles.moonImage}
            source={require("../assets/moon.png")}
          />
          <Image
            style={styles.halfSunImage}
            source={require("../assets/sunLeft.png")}
          />
        </View>

        {/* Nav to Login Page(Testing Purpose) */}
        {/* <Pressable
          onPress={() => this.props.navigation.navigate("Login")}
          style={styles.loginButton}
        >
          <Image
            style={styles.iconImage}
            source={require("../assets/favicon.png")}
          ></Image>
        </Pressable> */}

        {/* SleepGoalGraph */}
        <Graph
          title="Sleep Goal"
          goalStart="21"
          goalEnd="6"
          barColor="#3FDCFF"
          startTime = {startTime}
          endTime = {endTime}
        />
        <Graph
          title="Actual Sleep"
          goalStart="24"
          goalEnd="9"
          barColor="#FEE45A"
          startTime = {startTime}
          endTime = {endTime}
        />

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <ChangeTimeFramePopup
            title={"Sleep Goal"}
            style={styles.goalButton}
            startTime = {startTime}
            endTime = {endTime}
            updateTime={this.updateTime} 
          ></ChangeTimeFramePopup>

          <ChangeTimeFramePopup
            title={"Sleep Time"}
            style={styles.timeButton}
          ></ChangeTimeFramePopup>
        </View>

        {/* <BottomNav nav={this.props} /> */}
      </View>
    );
  }
}

export default IndexScreen;

//Stylesheet
const styles = StyleSheet.create({
  //general Layout
  layout: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6A4CE5",
  },
  indicatorContainer: {
    width: "90%",
    height: 50,
    paddingTop: 50,
    paddingBottom: 50,
    flexWrap: "wrap",
    // flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "center",
  },
  //Images
  iconImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  moonImage: {
    width: 45,
    height: 45,
  },
  halfSunImage: {
    width: 25,
    height: 50,
  },
  // Light/Dark Mode
  lightContainer: {
    backgroundColor: "#d0d0c0",
  },
  darkContainer: {
    backgroundColor: "#242c40",
  },
  lightThemeText: {
    color: "#242c40",
  },
  darkThemeText: {
    color: "#d0d0c0",
  },
  // goalButton: {
  //   margin: 5,
  // },
  // timeButton: {},
});
