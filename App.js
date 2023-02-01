import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/themed";
import { initializeApp } from "firebase/app";
import Login from "./modules/auth/adapters/components/Login";
import React from "react";
import Navigation from "./config/navigation/Navigation";

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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABpHgw1zHJYFOWGWrhHTsxlAPmhBF-G2E",
  authDomain: "financer-31c28.firebaseapp.com",
  projectId: "financer-31c28",
  storageBucket: "financer-31c28.appspot.com",
  messagingSenderId: "594821396842",
  appId: "1:594821396842:web:2298893ad3e227595f8d13",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
