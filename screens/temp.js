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
import Graph from "../components/Graph";
import ChangeTimeFramePopup from "../components/ChangeTimeFramePopup";

import firebase from "firebase/compat/app";

import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { auth, database } from "../screens/firebase";
import { update, ref, onValue, once } from "firebase/database";
let userID;
if (auth.currentUser) {
  userID = auth.currentUser.uid;
}

const goalSTRef = ref(database, userID + "/goalStartTime");
const goalETRef = ref(database, userID + "/goalStartTime");
const sleepSTRef = ref(database, userID + "/goalStartTime");
const sleepETRef = ref(database, userID + "/goalStartTime");

async function getGoalST(){
  const snapshot = await once(goalSTRef);
  const goalST = snapshot.val();
  return goalST;
}

// let goalST = ref(database, userID + "/goalStartTime");
onValue(goalSTRef, async (snapshot) => {
  getGoalST();
});
let goalET = ref(database, userID + "/goalEndTime");
onValue(goalET, (snapshot) => {
  goalET = snapshot.val();
});
let sleepST = ref(database, userID + "/sleepStartTime");
onValue(sleepST, (snapshot) => {
  sleepST = snapshot.val();
});
let sleepET = ref(database, userID + "/sleepEndTime");
onValue(sleepET, (snapshot) => {
  sleepET = snapshot.val();
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
      goalStartTime: getGoalST(),
      goalEndTime: goalET,
      sleepStartTime: sleepST,
      sleepEndTime: sleepET,
      uID:userID,
    };
    console.log("拿" + getGoalST())
    console.log(getGoalST())
  }

  // currentTimeDisplay = () => {
  //   styles.currentTime.left = 100;
  // }

  updateTime = () => {
    // let goalST = ref(database, userID + "/goalStartTime");
    // onValue(goalST, (snapshot) => {
    //   goalST = snapshot.val();
    // });
    let goalET = ref(database, userID + "/goalEndTime");
    onValue(goalET, (snapshot) => {
      goalET = snapshot.val();
    });
    let sleepST = ref(database, userID + "/sleepST");
    onValue(sleepST, (snapshot) => {
      sleepST = snapshot.val();
    });
    let sleepET = ref(database, userID + "/sleepET");
    onValue(sleepET, (snapshot) => {
      sleepET = snapshot.val();
    });

    //update state
    this.setState({ goalStartTime: getGoalST() });
    this.setState({ goalEndTime: goalET });
    this.setState({ sleepStartTime: sleepST });
    this.setState({ sleepEndTime: sleepET });
  };

  // handleTimeChange = (newST, newET) => {
  //   this.setState({ startTime: newST });
  //   this.setState({ endTime: newET });
  // }

  render() {
    const { goalStartTime, goalEndTime, sleepStartTime, sleepEndTime, uID } = this.state;
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
          startTime={goalStartTime}
          endTime={goalEndTime}
        />
        <Graph
          title="Actual Sleep"
          goalStart="24"
          goalEnd="9"
          barColor="#FEE45A"
          startTime={sleepStartTime}
          endTime={sleepEndTime}
        />

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <ChangeTimeFramePopup
            title={"Sleep Goal"}
            style={styles.goalButton}
            startTime={goalStartTime}
            endTime={goalEndTime}
            updateTime={this.updateTime}
            uID={uID}
            // onTimeChange={this.handleTimeChange}
          ></ChangeTimeFramePopup>

          <ChangeTimeFramePopup
            title={"Sleep Time"}
            style={styles.timeButton}
            startTime={sleepStartTime}
            endTime={sleepEndTime}
            updateTime={this.updateTime}
            uID={uID}
            // onTimeChange={this.handleTimeChange}
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
