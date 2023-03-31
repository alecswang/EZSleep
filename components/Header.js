import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  date = new Date().getDate(); //To get the Current Date
  month = new Date().getMonth() + 1; //To get the Current Month
  year = new Date().getFullYear(); //To get the Current Year
  fullDate = new Date(Date.now());

  render() {
    return (
      <View style={styles.container}>
        {/* Switch to the day before */}
        <Pressable
          onPress={this.props.showPreviousDay}
        >
          <Image
            style={styles.arrow}
            source={require("../assets/left-arrow.png")}
          />
        </Pressable>
        {/* Display date */}
        <Text style={styles.date}>
          {this.month + "/" + this.date + "/" + this.year}
        </Text>
        {/* dropdown arrow to change view */}
        <Pressable style={styles.changeView}>
          <Image
            style={styles.downArrow}
            source={require("../assets/down-arrow-white.png")}
          ></Image>
          <Text style={styles.viewText}>Day</Text>
          <Image
            style={styles.calendar}
            source={require("../assets/calendar.png")}
          ></Image>
        </Pressable>
        {/* Switch to the day after */}
        <Pressable onPress={this.props.showNextDay}>
          <Image
            style={styles.arrow}
            source={require("../assets/right-arrow.png")}
          />
        </Pressable>
      </View>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: "#414141",
    justifyContent: "center",
    flexWrap: "wrap",
    // flexDirection: "row",
    alignContent: "space-between",
    paddingBottom: 5,
  },
  date: {
    color: "white",
    fontSize: 18,
    paddingBottom: 1,
  },
  arrow: {
    width: 35,
    height: 35,
  },
  changeView: {
    position: "absolute",
    right: 50,
    top: 12,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  viewText: {
    color: "white",
    paddingRight: 3,
    paddingLeft: 2,
    fontSize: 15,
  },
  downArrow: {
    width: 20,
    height: 20,
  },
  calendar: {
    width: 20,
    height: 20,
  },
});
