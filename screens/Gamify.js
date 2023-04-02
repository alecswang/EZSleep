import React, { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Themes } from "../utilities/Themes";

import { Canvas, useFrame } from "@react-three/fiber/native";

let active = false;

function Box(props) {
  const mesh = useRef(null);
  const [hovered, setHover] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useFrame((state, delta) => {
    // console.log("cur " + state.mouse.y);
    // console.log("prev " + previousMousePosition.y);
    if (
      active &&
      state.mouse.y - previousMousePosition.y < 0.35 &&
      state.mouse.y - previousMousePosition.y > -0.35 &&
      state.mouse.x - previousMousePosition.x < 0.35 &&
      state.mouse.x - previousMousePosition.x > -0.35
    ) {
      // if (active) {
      // console.log("hi");
      // console.log("y: " + state.mouse.y);
      // console.log("prevYDiff " + (previousMousePosition.y));
      // console.log(state.mouse.x - previousMousePosition.x);

      mesh.current.rotation.y += (state.mouse.x - previousMousePosition.x) * 1;
      mesh.current.rotation.x += -(state.mouse.y - previousMousePosition.y) * 1;
    }
    setPreviousMousePosition({ x: state.mouse.x, y: state.mouse.y });
    active = true;
  });

  // const handlePointerMove = (event) => {
  //   if (active) {
  //     mesh.current.rotation.x += (event.clientY - previousMousePosition.y) * 0.005;
  //     mesh.current.rotation.y += (event.clientX - previousMousePosition.x) * 0.005;
  //     setPreviousMousePosition({ x: event.clientX, y: event.clientY });
  //   }
  // };

  return (
    <mesh
      {...props}
      ref={mesh}
      // onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      // onPointerMove={handlePointerMove}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

//Profile Page
const GamifyScreen = (props) => {
  const nav = useNavigation();

  // canvas.addEventListener('pointerdown', handlePointerDown);

  const handleTouchStart = () => {
    console.log(active);
    // active = true;
    console.log(active);
  };

  const handleTouchEnd = () => {
    active = false;
  };

  return (
    <>
      <View
        style={[
          styles.layout,
          props.lightModeEnabled ? Themes.light : Themes.dark,
        ]}
      >
        <Text style={styles.title}>Hello</Text>
      </View>
      <Canvas
        style={styles.canvasLayout}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </>
  );
};

export default GamifyScreen;

const styles = StyleSheet.create({
  //general Layout
  layout: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#654CE0",
  },
  //Testing purpose
  title: {
    fontSize: 32,
    marginBottom: 16,
    // position: "absolute",
    // top: 70,
    // justifyContent: "center",
    // color: "#fff",
  },
  //Back Button
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#654CE0",
    position: "absolute",
    top: 70,
    right: 20,
  },
  //Images
  backImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  canvasLayout: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#654CE0",
  },
});
