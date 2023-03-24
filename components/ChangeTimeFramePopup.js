import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

class ChangeTimeFramePopup extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    modalVisible: false,
  };

  render() {
    const { modalVisible } = this.state;
    const timeFrames = ["Egypt", "Canada", "Australia", "Ireland"];
    return (
      <View style={styles}>
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
              />
              {/* <View style={}></View> */}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setState({ modalVisible: !modalVisible })}
              >
                <Text style={[styles.textStyle, { color: "white" }]}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setState({ modalVisible: !modalVisible })}
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
          onPress={() => this.setState({ modalVisible: true })}
        >
          <Text style={styles.textStyle}>{"Change " + this.props.title}</Text>
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
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "lightgrey",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
