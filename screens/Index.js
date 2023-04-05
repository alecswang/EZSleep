import React, {useContext, useState, useEffect} from "react";
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
import { ThemeContext } from "../utilities/ThemeContext";
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
const IndexScreen = () => {
  const [goalST, setGoalST] = useState(null);
  const [goalET, setGoalET] = useState(null);
  const [sleepST, setSleepST] = useState(null);
  const [sleepET, setSleepET] = useState(null);
  const [userID, setUserID] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const {theme} = useContext(ThemeContext);

  const initialize = () => {
    if (firebase.auth().currentUser) {
      let userID = firebase.auth().currentUser.uid;
      setUserID(userID);
      while (userID == null) {
        userID = firebase.auth().currentUser.uid;
        console.log("hi" + userID);
      }
    }

    const goalSTRef = ref(database, userID + "/goalStartTime");
    onValue(goalSTRef, (snapshot) => {
      setGoalST(snapshot.val());
    });
    const goalETRef = ref(database, userID + "/goalEndTime");
    onValue(goalETRef, (snapshot) => {
      setGoalET(snapshot.val());
    });
    const sleepSTRef = ref(database, userID + "/" + currentDay + "/sleepStartTime");
    onValue(sleepSTRef, (snapshot) => {
      setSleepST(snapshot.val());
    });
    const sleepETRef = ref(database, userID + "/" + currentDay + "/sleepEndTime");
    onValue(sleepETRef, (snapshot) => {
      setSleepET(snapshot.val());
    });

    console.log(goalST);
    console.log(goalET);
    console.log(sleepST);
    console.log(sleepET);
  };

  useEffect(() => {
    const { currentUser } = firebase.auth();
    setCurrentUser(currentUser);
    initialize();
  }, []);

  const updateTime = () => {
    const goalSTRef = ref(database, userID + "/goalStartTime");
    onValue(goalSTRef, (snapshot) => {
      setGoalST(snapshot.val());
    });

    const goalETRef = ref(database, userID + "/goalEndTime");
    onValue(goalETRef, (snapshot) => {
      setGoalET(snapshot.val());
    });

    const sleepSTRef = ref(database, userID + "/" + currentDay + "/sleepStartTime");
    onValue(sleepSTRef, (snapshot) => {
      setSleepST(snapshot.val());
    });

    const sleepETRef = ref(database, userID + "/" + currentDay + "/sleepEndTime");
    onValue(sleepETRef, (snapshot) => {
      setSleepET(snapshot.val());
    });

    console.log(goalST);
    console.log(goalET);
    console.log(sleepST);
    console.log(sleepET);

    console.log("updating time " + sleepST);

    const pstDate = new Date(Date.now());
    const year = pstDate.getFullYear();
    const month = pstDate.getMonth() + 1;
    const day = pstDate.getDate();
    const currentDay = [year] + [month] + [day];
    setCurrentDay(currentDay);
  };

  const showPreviousDay = () => {
    //need to add convert currentday funciton
    //need to fix left NaN
    setCurrentDay({ currentDay: [year] + "" + [month] + [day - 1] });
    // this.updateTime();
  };

  const showNextDay = () => {};

  // handleTimeChange = (newST, newET) => {
  //   this.setState({ startTime: newST });
  //   this.setState({ endTime: newET });
  // }


    return (
      <View
        style={[
          styles.layout,
          Themes[theme],
        ]}
      >
        <Header
          showPreviousDay={showPreviousDay}
          showNextDay={showNextDay}
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
          updateTime={updateTime}
          startTime={goalST}
          endTime={goalET}
        />
        <Graph
          title="Actual Sleep"
          barColor="#FEE45A"
          updateTime={updateTime}
          startTime={sleepST}
          endTime={sleepET}
        />

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <ChangeTimeFramePopup
            title={"Sleep Goal"}
            style={styles.goalButton}
            startTime={goalST}
            endTime={goalET}
            updateTime={updateTime}
            currentDay={currentDay}
            uID={userID}
            reference={"goal"}
            // onTimeChange={this.handleTimeChange}
          ></ChangeTimeFramePopup>

          <ChangeTimeFramePopup
            title={"Sleep Time"}
            style={styles.timeButton}
            startTime={sleepST}
            endTime={sleepET}
            updateTime={updateTime}
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
