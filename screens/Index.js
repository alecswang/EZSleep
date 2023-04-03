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
import { Themes } from "../utilities/Themes";

import { auth, database } from "../utilities/firebase";
import { update, ref, onValue, get, child } from "firebase/database";
let userID = null;
if (auth.currentUser) {
  while (userID == null) {
    userID = auth.currentUser.uid;
    console.log("hiIndex" + userID);
  }
}

//for date
// let fullDate = new Date(Date.now());
// let pstDate = fullDate.toLocaleString("en-US", {
//   timeZone: "America/Los_Angeles",
// });
let pstDate = new Date(Date.now());
let year = pstDate.getFullYear();
let month = pstDate.getMonth() + 1;
let day = pstDate.getDate();
let currentDay = [year] + [month] + [day];
console.log("currentDayt" + currentDay);

//code below are for changing dates and updating the form accordingly
let databaseDay = ref(database, [userID] + "/currentDay");
onValue(databaseDay, (snapshot) => {
  databaseDay = snapshot.val();
  if (databaseDay != null && day != databaseDay) {
    console.log("firebaseDayChange");
    newDay();
  }
  //firebase set dayData
  const updates = {};
  console.log("day" + currentDay);
  updates[[userID] + "/currentDay"] = currentDay;
  update(ref(database), updates);
});

// if new day
function newDay() {
  //firebase
  const updates = {};
  // for every event
  updates[[userID] + "/" + currentDay] = { sleepStartTime: 0, sleepEndTime: 0 };
  update(ref(database), updates);
}

// let goalST = ref(database, userID + "/goalStartTime");
// onValue(goalST, async (snapshot) => {
//   goalST = await snapshot.val();
// });
// let goalET = ref(database, userID + "/goalEndTime");
// onValue(goalET, async (snapshot) => {
//   goalET = await snapshot.val();
// });
// let sleepST = ref(database, userID + "/" + currentDay + "/sleepStartTime");
// onValue(sleepST, async (snapshot) => {
//   sleepST = await snapshot.val();
// });
// let sleepET = ref(database, userID + "/" + currentDay + "/sleepEndTime");
// onValue(sleepET, async (snapshot) => {
//   sleepET = await snapshot.val();
// });

//Index/Main Page
class IndexScreen extends React.Component {
  goalST = null;
  goalET = null;
  sleepST = null;
  sleepET = null;
  userID = null;
  initialize() {
    if (auth.currentUser) {
      this.userID = auth.currentUser.uid;
      while (this.userID == null) {
        this.userID = auth.currentUser.uid;
        console.log("hi" + this.userID);
      }
    }

    let goalSTRef = ref(database, this.userID + "/goalStartTime");
    // get(ref(database), this.userID + "/goalStartTime").then((snapshot) => {
    //   if (snapshot.exists()) {
    //     this.goalST = snapshot.val();
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    //   console.log("Just to show");
    // }).catch((error) => {
    //   console.error(error);
    //   console.log(error);
    // });
    onValue(
      goalSTRef,
      (snapshot) => {
        if (snapshot.exists()) {
          this.goalST = snapshot.val();
          console.log("start" + this.goalST);
        } else {
          console.log("No data available");
        }
      },
      (error) => {
        console.error("huh" + error);
      }
    );
    let goalETRef = ref(database, this.userID + "/goalEndTime");
    onValue(goalETRef, (snapshot) => {
      const data = snapshot.val();
      this.goalET = data;
    });
    let sleepSTRef = ref(
      database,
      this.userID + "/" + currentDay + "/sleepStartTime"
    );
    onValue(sleepSTRef, (snapshot) => {
      this.sleepST = snapshot.val();
    });
    let sleepETRef = ref(
      database,
      this.userID + "/" + currentDay + "/sleepEndTime"
    );
    onValue(sleepETRef, (snapshot) => {
      this.sleepET = snapshot.val();
    });
    // console.log(this.goalST)

    //update state
    // this.state = {
    //   goalStartTime: this.goalST,
    //   goalEndTime: this.goalET,
    //   sleepStartTime: this.sleepST,
    //   sleepEndTime: this.sleepET,
    //   userID: this.userID,
    // };
  }
  state = { currentUser: null };
  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }
  constructor(props) {
    super(props);
    this.initialize();
    //To get the Current Date
    // var date = new Date().getDate();
    this.state = {
      goalStartTime: this.goalST,
      goalEndTime: this.goalET,
      sleepStartTime: this.sleepST,
      sleepEndTime: this.sleepET,
      userID: this.userID,
      currentDay: currentDay,
    };
    console.log("id" + this.userID);
    console.log("here" + this.goalST);
    console.log("here" + this.goalET);
    console.log("here" + this.sleepST);
    console.log("here" + this.sleepET);
  }

  // currentTimeDisplay = () => {
  //   styles.currentTime.left = 100;
  // }

  updateTime = () => {
    let goalSTRef = ref(database, this.userID + "/goalStartTime");
    onValue(goalSTRef, (snapshot) => {
      const data = snapshot.val();
      this.goalST = data;
    });
    let goalETRef = ref(database, this.userID + "/goalEndTime");
    onValue(goalETRef, (snapshot) => {
      const data = snapshot.val();
      this.goalET = data;
    });
    let sleepSTRef = ref(
      database,
      this.userID + "/" + currentDay + "/sleepStartTime"
    );
    onValue(sleepSTRef, (snapshot) => {
      this.sleepST = snapshot.val();
    });
    let sleepETRef = ref(
      database,
      this.userID + "/" + currentDay + "/sleepEndTime"
    );
    onValue(sleepETRef, (snapshot) => {
      this.sleepET = snapshot.val();
    });

    //update state
    this.setState({ goalStartTime: this.goalST });
    this.setState({ goalEndTime: this.goalET });
    this.setState({ sleepStartTime: this.sleepST });
    this.setState({ sleepEndTime: this.sleepET });
    console.log(this.goalST);
    console.log(this.goalET);
    console.log(this.state.goalStartTime);
    console.log(this.state.goalEndTime);
    console.log(this.state.sleepStartTime);
    console.log(this.state.sleepEndTime);

    console.log("updating time " + this.state.sleepStartTime);

    pstDate = new Date(Date.now());
    year = pstDate.getFullYear();
    month = pstDate.getMonth() + 1;
    day = pstDate.getDate();
    currentDay = [year] + [month] + [day];
  };

  showPreviousDay = () => {
    //need to add convert currentday funciton
    //need to fix left NaN
    this.setState({ currentDay: [year] + "" + [month] + [day - 1] });
    // this.updateTime();
  };

  showNextDay = () => {};

  // handleTimeChange = (newST, newET) => {
  //   this.setState({ startTime: newST });
  //   this.setState({ endTime: newET });
  // }

  render() {
    const {
      goalStartTime,
      goalEndTime,
      sleepStartTime,
      sleepEndTime,
      userID,
      currentDay,
    } = this.state;
    return (
      <View
        style={[
          styles.layout,
          this.props.lightModeEnabled ? Themes.light : Themes.dark,
        ]}
      >
        <Header
          showPreviousDay={this.showPreviousDay}
          showNextDay={this.showNextDay}
          currentDay={currentDay}
        ></Header>
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
          barColor="#3FDCFF"
          updateTime={this.updateTime}
          startTime={goalStartTime}
          endTime={goalEndTime}
        />
        <Graph
          title="Actual Sleep"
          barColor="#FEE45A"
          updateTime={this.updateTime}
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
            currentDay={currentDay}
            uID={userID}
            reference={"goal"}
            // onTimeChange={this.handleTimeChange}
          ></ChangeTimeFramePopup>

          <ChangeTimeFramePopup
            title={"Sleep Time"}
            style={styles.timeButton}
            startTime={sleepStartTime}
            endTime={sleepEndTime}
            updateTime={this.updateTime}
            currentDay={currentDay}
            uID={userID}
            reference={"sleep"}
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
