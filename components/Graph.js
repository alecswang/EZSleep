import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  date = new Date().getDate();
  month = new Date().getMonth() + 1; //To get the Current Month
  year = new Date().getFullYear(); //To get the Current Year
  hours = new Date().getHours(); //To get the Current Hours
  minutes = new Date().getMinutes(); //To get the Current Minutes
  seconds = new Date().getSeconds(); //To get the Current Seconds

  time = 0;
  width = 350;
  setTime(time) {
    if (time == null) {
      this.time = 0;
      this.time += this.hours;
      //convert military time
      if (this.time < 12) {
        //if morning
        this.time += 12;
      } else {
        //if pass noon
        this.time -= 12;
      }
      this.time += this.minutes / 60;
      this.time *= 350 / 24;
    } else {
      //convert military time
      if (time < 12) {
        //if morning
        time = time - 0 + 12;
      } else {
        //if pass noon
        time -= 12;
      }
      this.time = (time * 350) / 24;
    }
  }

  displayTime = function (time) {
    this.setTime(time);
    console.log("this时间" + this.time)
    console.log("时间" + time)
    return {
      width: 6,
      height: 40,
      backgroundColor: this.props.barColor,
      position: "absolute",
      bottom: 10,
      left: this.time,
    };
  };
  render() {
    return (
      <View style={[styles.container]}>
        {/* Top part */}
        <View style={styles.topGraph}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        {/* Main part */}
        <View style={styles.mainGraph}>
          <View style={this.displayTime(this.props.startTime)} />
          <View style={this.displayTime(this.props.endTime)} />
          {/* Current time */}
          <View
            style={[this.displayTime(), { backgroundColor: "white", width: 3 }]}
          />
        </View>
        {/* Bottom time */}
        <View style={[styles.bottomBar, { backgroundColor: this.props.barColor }]} />
        <View style={styles.bottomGraph}>
          <Image
            style={styles.hoursImg}
            source={require("../assets/sun.png")}
          ></Image>
          <Text style={styles.hours}>4pm</Text>
          <Text style={styles.hours}>8pm</Text>
          <Image
            style={styles.hoursImg}
            source={require("../assets/moon.png")}
          ></Image>
          <Text style={styles.hours}>4am</Text>
          <Text style={styles.hours}>8am</Text>
          <Image
            style={styles.hoursImg}
            source={require("../assets/sun.png")}
          ></Image>
        </View>
      </View>
    );
  }
}

export default Graph;

const styles = StyleSheet.create({
  container: {
    width: 403,
    backgroundColor: "#6171FF",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  topGraph: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    // fontFamily: "serif",
  },
  changeTimeFrameText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  mainGraph: {
    width: 350,
    height: 60,
  },
  bottomBar: {
    width: "85%",
    height: 6,
    // backgroundColor: "#3FDCFF",
  },
  bottomGraph: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 5,
    paddingBottom: 20,
  },
  hours: {
    color: "white",
  },
  hoursImg: {
    width: 20,
    height: 20,
  },
});
