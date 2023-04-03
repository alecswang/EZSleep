// import React from "react";
// import { View, Image, Pressable, StyleSheet } from "react-native";

// class BottomNav extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <View
//         style={{
//           width: "90%",
//           height: 70,
//           position: "absolute",
//           bottom: 0,
//           flex: 1,
//           justifyContent: "center",
//           alignContent: "space-around",
//           flexWrap: "wrap",
//         }}
//       >
//         {/* Navigate to Index Page */}
//         <Pressable
//           onPress={() => this.props.nav.navigation.navigate("Index")}
//           style={styles.loginButton}
//         >
//           <Image style={styles.icon} source={require("../assets/graph.png")} />
//         </Pressable>
//         {/* Navigate to Gamify Page */}
//         <Pressable
//           onPress={() => this.props.nav.navigation.navigate("Gamify")}
//           style={styles.loginButton}
//         >
//           <Image style={styles.icon} source={require("../assets/gamify.png")} />
//         </Pressable>
//         {/* Navigate to Support Page */}
//         <Pressable
//           onPress={() => this.props.nav.navigation.navigate("Support")}
//           style={styles.loginButton}
//         >
//           <Image
//             style={styles.icon}
//             source={require("../assets/support.png")}
//           />
//         </Pressable>
//         {/* Navigate to Index Page */}
//         <Pressable
//           onPress={() => this.props.nav.navigation.navigate("Profile")}
//           style={styles.loginButton}
//         >
//           <Image
//             style={styles.icon}
//             source={require("../assets/profile.png")}
//           />
//         </Pressable>
//       </View>
//     );
//   }
// }

// export default BottomNav;

// const styles = StyleSheet.create({
//   icon: {
//     width: 50,
//     height: 50,
//     // borderRadius: 30,
//   },
// });
