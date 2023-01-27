import { useState } from "react"; // This is a hook that allows us to use state in functional components
import { StyleSheet, Text, View } from "react-native";
import React from "react";

// A hook is a function which lets you "hook into" React state and lifecycle features from function components

// The lifecycle of a component is the order in which the methods are called
// The methods are called in the following order:
// 1. constructor
// 2. getDerivedStateFromProps
// 3. render
// 4. getSnapshotBeforeUpdate
// 5.- React updates the DOM
// 6. componentDidUpdate


// Props are the properties that are passed to the component
// You can send props from the parent component to the child component
// The parent component is the one that calls the child component
// The child component is the one that receives the props

export default function login(props) {
  const [name, setName] = useState('')
  return (
    <View>
      <Text>Hola David Martinez</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
