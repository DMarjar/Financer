import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Image, Button } from "@rneui/base";

export default function UserGuest() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.mx} centerContent={true}>
        <Image
          source={require("../../../../assets/banco.png")}
          resizeMode="contain"
          style={styles.img}
        />
        <Text style={styles.title}>Welcome to Financer</Text>
        <Text style={styles.description}>
          Discover a smarter way to manage your finances with Financer! Don't
          miss out on the chance to take control of your financial future - sign
          up or log in now!{" "}
        </Text>
        <View style={styles.viewBtnContainer}>
            <Button
                title="Sign Up"
                icon={{
                    name: "account-plus-outline",
                    type: "material-community",
                    size: 20,
                    color: "white",
                }}
                buttonStyle={styles.btnSign}
                containerStyle={styles.btnContainer}
                onPress={() => console.log("Sign Up")}
                radius={10}
            />
            <Button
                title="Log In"
                icon={{
                    name: "login",
                    type: "material-community",
                    size: 20,
                    color: "white",
                }}
                buttonStyle={styles.btnLogin}
                containerStyle={styles.btnContainer}
                onPress={() => console.log("Log in")}
                radius={10}
            />
        </View>
      </ScrollView>
      <Text>UserGuest</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  mx: {
    marginLeft: 32,
    marginRight: 32,
  },
  img: {
    width: "100%",
    height: 200,
    marginTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    margin: 16,
    textAlign: "center",
    color: "#6A0090",
  },
    description: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 16,
    },
    viewBtnContainer: {
        flex: 1, // Para que el boton se expanda al maximo
        alignItems: "center",
    },
    btnContainer: {
        width: "100%",
        marginBottom: 16,
    },
    btnSign:{
        backgroundColor: "#5F1AFF",
        color: "#fff",
    },
    btnLogin:{
        backgroundColor: "#FF0079",
        color: "#fff",
    },
});
