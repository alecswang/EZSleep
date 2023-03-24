// import React, { useEffect, useState } from "react";
// import { Image, Pressable, StyleSheet, Text, View, Switch } from "react-native";
// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
//   interpolateColor,
//   useDerivedValue,
// } from "react-native-reanimated";

// function useDarkmode() {
//   // Dark/Light Mode
//   const [darkEnabled, setdarkEnabled] = useState(false);
//   const toggleSwitch = () => setdarkEnabled((previousState) => !previousState);

//   // general code used for animations
//   const progress = useDerivedValue(() => {
//     return darkEnabled ? withTiming(1) : withTiming(0);
//   });
//   // Animation for background
//   const backgroundAnimation = useAnimatedStyle(() => {
//     const backgroundColor = interpolateColor(
//       progress.value,
//       [0, 1],
//       [Colors.light.background, Colors.dark.background]
//     );
//     return {
//       backgroundColor,
//     };
//   });
//   // Animation for textColors
//   const textAnimation = useAnimatedStyle(() => {
//     const color = interpolateColor(
//       progress.value,
//       [0, 1],
//       [Colors.light.text, Colors.dark.text]
//     );
//     return {
//       color,
//     };
//   });
//   return { backgroundAnimation, textAnimation, toggleSwitch, darkEnabled };
// }

// const SWITCH_TRACK_COLOR = {
//   true: "#81b0ff",
//   false: "#767577",
// };

// const SWITCH_THUMB_COLOR = {
//   true: "#000",
//   false: "#fff",
// };
