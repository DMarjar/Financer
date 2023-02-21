import { StyleSheet } from "react-native";
import React from "react";
import Navigation from "./config/navigation/Navigation";
import { initializeApp } from "firebase/app";
import { app } from "./config/utils/Firebase";

export default function App() {
  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
