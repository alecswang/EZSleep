import React, { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Themes } from "../utilities/Themes";

import { Canvas, useFrame } from "@react-three/fiber/native";

function Box(props) {
  const mesh = useRef(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });

  useFrame(
    (state, delta) => {
      if (active) {
      console.log(state.mouse.x);
      (mesh.current.rotation.x += 0.01);
      (mesh.current.rotation.y += 0.01)
      }
    }
  );
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

//Profile Page
const GamifyScreen = (props) => {
  const nav = useNavigation();

  const [isDragging, setDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({
    x: null,
    y: null,
  });
  const handlePointerUp = (event) => {
    console.log("moving movin");
    setDragging(false);
    event.target.style.cursor = "grab";
  };

  const handlePointerDown = (event) => {
    console.log("moving movin");
    setDragging(true);
    setPreviousMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handlePointerMove = (event) => {
    console.log("moving movin");
    if (!isDragging) {
      return;
    }

    const delta = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y,
    };

    // setPreviousMousePosition({
    //   x: event.clientX,
    //   y: event.clientY,
    // });

    const canvas = event.target;
    // canvas.style.cursor = "grabbing";

    const rotation = {
      x: delta.y * 0.01,
      y: delta.x * 0.01,
      z: 0,
    };

    canvas.scene.rotation.x += rotation.x;
    canvas.scene.rotation.y += rotation.y;
    canvas.scene.rotation.z += rotation.z;
  };

  return (
    <>
      <View style={styles.layout}>
        <Text style={styles.title}>Hello</Text>
      </View>
      <Canvas
        style={styles.canvasLayout}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
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
