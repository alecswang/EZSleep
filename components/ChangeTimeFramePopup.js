import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import { auth, database } from "../screens/firebase";
import { update, ref, onValue } from "firebase/database";

class ChangeTimeFramePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      startTime: this.props.startTime,
      endTime: this.props.endTime,
    };
  }

  convertToRegular(time) {
    let res = time;
    if (time > 12) {
      res -= 12;
    }
    res = "" + res.toString().split(".")[0];
    // if (res == "0") {res = "12"; }
    if (time.toString().split(".")[1]) {
      res += ":" + parseInt(time.toString().split(".")[1]) / 100 * 60;
    } else {
      res += ":00";
    }
    if(parseInt(time.toString().split(".")[1]) == 5){res += 0;}
    res += time > 12 ? "pm" : "am";
    return res;
  }

  convertToMilitary(time) {
    let hour;
    hour = time.toString().split(":")[0] / 1 + time.toString().split(":")[1].slice(0, 2) / 60;
    if (time.toString().split(":")[1].slice(2) == "pm") {
      hour += 12;
    }
    // if (time.length == 7) {
    //   hour = time.slice(0, 2) / 1 + time.slice(3, 5) / 60;
    //   if (time.slice(5) == "pm") {
    //     hour += 12;
    //   }
    // } else {
    //   hour = time.slice(0, 1) / 1 + time.slice(2, 4) / 60;
    //   if (time.slice(4) == "pm") {
    //     hour += 12;
    //   }
    // }
    return hour;
  }
  
  render() {
    const { modalVisible, startTime, endTime } = this.state;
    const timeFrames = [
      "12:00am",
      "12:15am",
      "12:30am",
      "12:45am",
      "1:00am",
      "1:15am",
      "1:30am",
      "1:45am",
      "2:00am",
      "2:15am",
      "2:30am",
      "2:45am",
      "3:00am",
      "3:15am",
      "3:30am",
      "3:45am",
      "4:00am",
      "4:15am",
      "4:30am",
      "4:45am",
      "5:00am",
      "5:15am",
      "5:30am",
      "5:45am",
      "6:00am",
      "6:15am",
      "6:30am",
      "6:45am",
      "7:00am",
      "7:15am",
      "7:30am",
      "7:45am",
      "8:00am",
      "8:15am",
      "8:30am",
      "8:45am",
      "9:00am",
      "9:15am",
      "9:30am",
      "9:45am",
      "10:00am",
      "10:15am",
      "10:30am",
      "10:45am",
      "11:00am",
      "11:15am",
      "11:30am",
      "11:45am",
      "12:00pm",
      "12:15pm",
      "12:30pm",
      "12:45pm",
      "1:00pm",
      "1:15pm",
      "1:30pm",
      "1:45pm",
      "2:00pm",
      "2:15pm",
      "2:30pm",
      "2:45pm",
      "3:00pm",
      "3:15pm",
      "3:30pm",
      "3:45pm",
      "4:00pm",
      "4:15pm",
      "4:30pm",
      "4:45pm",
      "5:00pm",
      "5:15pm",
      "5:30pm",
      "5:45pm",
      "6:00pm",
      "6:15pm",
      "6:30pm",
      "6:45pm",
      "7:00pm",
      "7:15pm",
      "7:30pm",
      "7:45pm",
      "8:00pm",
      "8:15pm",
      "8:30pm",
      "8:45pm",
      "9:00pm",
      "9:15pm",
      "9:30pm",
      "9:45pm",
      "10:00pm",
      "10:15pm",
      "10:30pm",
      "10:45pm",
      "11:00pm",
      "11:15pm",
      "11:30pm",
      "11:45pm",
    ];
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setState({ modalVisible: !modalVisible });
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Select Time Frame</Text>
              <SelectDropdown
                data={timeFrames}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  this.setState({ startTime: this.convertToMilitary(selectedItem) });
                  // this.props.onTimeChange(this.convertToMilitary(selectedItem), this.props.endTime);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
                defaultValue={this.convertToRegular(startTime)}
                buttonStyle={styles.leftDropDown}
              />
              <SelectDropdown
                data={timeFrames}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  // this.props.onTimeChange(this.props.startTime, this.convertToMilitary(selectedItem));
                  this.setState({ endTime: this.convertToMilitary(selectedItem) });
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
                defaultValue={this.convertToRegular(endTime)}
                buttonStyle={styles.rightDropDown}
              />
              {/* close popup button */}
              <Pressable
                style={[styles.cancelButton]}
                onPress={() => this.setState({ modalVisible: !modalVisible })}
              >
                <Image
                  style={styles.cancelImage}
                  source={require("../assets/cross.png")}
                ></Image>
              </Pressable>
              {/* submit (change time frame) button */}
              <Pressable
                style={[styles.button, styles.confirmButton]}
                onPress={() => {
                  const updates = {};
                  updates[[this.props.uID] + "/startTime"] =
                   startTime;
                  updates[[this.props.uID] + "/endTime"] = endTime;
                  update(ref(database), updates);
                  this.props.updateTime();
                  this.setState({ modalVisible: !modalVisible });
                }}
              >
                <Text style={[styles.textStyle, { color: "white" }]}>
                  Confirm
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            this.setState({ modalVisible: true });
          }}
        >
          <Text style={styles.textStyle}>
            {"Change " + this.props.title + " >"}
          </Text>
        </Pressable>
      </View>
      //   <Modal
      //     transparent={true}
      //     visible={true}
      //     onPress={() => this.props.nav.navigation.navigate("Profile")}
      //     style={styles.changeTimeFrameButton}
      //   >
      //     <Text style={styles.changeTimeFrameText}>
      //       {"Change " + this.props.title}
      //     </Text>
      //   </Modal>
    );
  }
}

export default ChangeTimeFramePopup;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 280,
    height: 200,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#6171FF",
    width: 180,
    height: 45,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    justifyContent: "center",
  },
  cancelButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  cancelImage: {
    width: 20,
    height: 20,
  },
  confirmButton: {
    backgroundColor: "#4857E5",
    position: "absolute",
    top: 140,
    right: "50%",
    width: 70,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 13,
    textAlign: "center",
    color: "white",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  leftDropDown: {
    width: 100,
    height: 40,
    borderRadius: 5,
    position: "absolute",
    top: 80,
    left: 30,
  },
  rightDropDown: {
    width: 100,
    height: 40,
    borderRadius: 5,
    position: "absolute",
    top: 80,
    right: 30,
  },
});
