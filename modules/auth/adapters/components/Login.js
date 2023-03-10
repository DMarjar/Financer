import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react"; // useState
import { Input, Button, Image, Icon } from "@rneui/base";
import { isEmpty } from "lodash";
import Loading from "../../../../kernel/components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { app } from "../../../../config/utils/Firebase";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login(props) {
  const { navigation } = props;
  const [error, setError] = useState({ email: "", password: "" }); // useState sirve para manejar el estado de un componente
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);

  const login = () => {
    if (!(isEmpty(email) || isEmpty(password))) {
      setLoading(true);
      setError({ email: "", password: "" });
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          try {
            await AsyncStorage.setItem("@session", JSON.stringify(user));
            console.log("Usuario logueado -> " + JSON.stringify(user));
            navigation.navigate("profileStack");
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        })
        .catch((error) => {
          setError({
            email: "Email is required",
            password: "Email or password are incorrect",
          });
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      setError({
        email: "Email is required",
        password: "Password is required",
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={require("../../../../assets/banco.png")}
          resizeMode="contain" // Adapta la imagen al tama??o del contenedor
          style={styles.logo}
        />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none" // No capitaliza la primera letra
          containerStyle={styles.input}
          onChange={(event) => setEmail(event.nativeEvent.text)} // nativeEvent es la interacci??n del usuario con el input
          errorMessage={error.email}
          rightIcon={
            <Icon
              type="material-community"
              name="at"
              size={22}
              color="#FF0079"
            />
          }
        />
        <Input
          placeholder="Password"
          keyboardType="password"
          autoCapitalize="none"
          secureTextEntry={showPassword}
          rightIcon={
            <Icon
              type="material-community"
              name={showPassword ? "eye-off-outline" : "eye-outline"} // Si showPassword es true, muestra el icono de ojo abierto, si es false, muestra el icono de ojo cerrado
              iconStyle={
                showPassword ? { color: "#c2c2c2" } : { color: "#FF0079" }
              } // Si showPassword es true, muestra el icono de ojo cerrado en color gris, si es false, muestra el icono de ojo abierto en color rojo
              onPress={() => setShowPassword(!showPassword)} // Si showPassword es true, lo cambia a false, si es false, lo cambia a true
            />
          }
          containerStyle={styles.input}
          onChange={(event) => setPassword(event.nativeEvent.text)}
          errorMessage={error.password}
        />
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
        <Text
          style={styles.createAccount}
          // Sends the user to the create account screen
          onPress={() => navigation.navigate("createUserStack")}
        >
          Don't have an account?{" "}
        </Text>
        <Loading show={loading} text="Logging in..." />
      </ScrollView>
      <View>
        <Text>Copyright Financer 2023</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: 150,
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  btnContainer: {
    width: "50%",
    marginBottom: 16,
    alignContent: "center",
    alignSelf: "center",
  },
  btnLogin: {
    backgroundColor: "#FF0079",
    borderRadius: 10,
    width: "100%",
  },
  createAccount: {
    alignSelf: "center",
    marginTop: 8,
    color: "#FF0079",
  },
});
