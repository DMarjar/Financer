import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/themed";
import { initializeApp } from "firebase/app";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola David Martinez</Text>
      <Button
        title="Basic Button"
        buttonStyle={{
          backgroundColor: "rgba(78, 116, 289, 1)",
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABpHgw1zHJYFOWGWrhHTsxlAPmhBF-G2E",
  authDomain: "financer-31c28.firebaseapp.com",
  projectId: "financer-31c28",
  storageBucket: "financer-31c28.appspot.com",
  messagingSenderId: "594821396842",
  appId: "1:594821396842:web:2298893ad3e227595f8d13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
