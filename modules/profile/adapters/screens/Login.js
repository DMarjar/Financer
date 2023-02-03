import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react"; // useState
import { Input, Button, Image, Icon } from "@rneui/base";
import { isEmpty } from "lodash";

export default function Login() {
  const [error, setError] = useState(""); // useState sirve para manejar el estado de un componente
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    if (!(isEmpty(email) || isEmpty(password))) {
      console.log("Login");
    } else {
      setError("Campo obligatorio");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={require("../../../../assets/banco.png")}
          resizeMode="contain" // Adapta la imagen al tamaño del contenedor
          style={styles.logo}
        />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          containerStyle={styles.input}
          onChange={(event) => setEmail(event.nativeEvent.text)} // nativeEvent es la interacción del usuario con el input
          errorMessage={error}
        />
        <View style={styles.bntView}>
          <Button
            title="Log in"
            icon={{
              name: "login",
              type: "material-community",
              size: 20,
              color: "white",
            }}
            buttonStyle={styles.btnLogin}
            containerStyle={styles.btnContainer}
            onPress={login}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
  logo: {
    width: "100%",
    height: 150,
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    marginBottom: 10,
  },
  bntView: {
    flex: 1,
    alignItems: "center",
  },
  btnContainer: {
    width: "70%",
    marginBottom: 16,
  },
  btnLogin: {
    backgroundColor: "#BF0AFF",
    borderRadius: 10,
    width: "50%",
  },
});
