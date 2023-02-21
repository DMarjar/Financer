import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { Image, Input, Button, Icon } from "@rneui/base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isEmpty, size } from "lodash";
import Loading from "../../kernel/components/Loading";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { validateEmail } from "./../../kernel/validations/ValidateEmail";

const payload = {
  email: "",
  password: "",
  repeatPassword: "",
};

const changePayload = (e, type) => {
  setData({ ...data, [type]: e.nativeEvent.text }); // ... sirve para asignar el valor de un objeto a otro
};

const auth = getAuth();
const [loading, setLoading] = useState(false);
const [error, setError] = useState(payload);
const [data, setData] = useState(payload);
const [showPassword, setShowPassword] = useState(true);
const [showRepeatPassword, setShowRepeatPassword] = useState(true);

const createUser = () => {
  if (!(isEmpty(data.email) || isEmpty(data.password))) {
    if (validateEmail(data.email)) {
      if (size(data.password) >= 6) {
        if (data.password === data.repeatPassword) {
          setLoading(true);
          createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((response) => {
              setLoading(false);
              // Send the user to the login screen
              navigation.navigate("login");
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
            });
        } else {
          setError({
            email: "",
            password: "",
            repeatPassword: "Passwords do not match",
          });
        }
      } else {
        setError({
          email: "",
          password: "Password must be at least 6 characters",
          repeatPassword: "",
        });
      }
    } else {
      setError({
        email: "Email is not valid",
        password: "",
        repeatPassword: "",
      });
    }
  } else {
    setError({
      email: "Email is required",
      password: "Password is required",
      repeatPassword: "Repeat the password",
    });
  }
};

export default function CreateUser() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../assets/banco.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <View style={styles.container}>
          <Input
            placeholder="Email"
            containerStyle={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            onChange={(e) => changePayload(e, "email")} // e is the event, "email" is the key
            errorMessage={error.email}
            rightIcon={<Icon type="material-community" name="at" size={22} />}
          />
          <Input
            placeholder="Password"
            keyboardType="password"
            autoCapitalize="none"
            secureTextEntry={showPassword}
            containerStyle={styles.input}
            onChange={(event) => changePayload(e, "password")}
            errorMessage={error.password}
            rightIcon={
              <Icon
                type="material-community"
                name={showPassword ? "eye-off-outline" : "eye-outline"} // Si showPassword es true, muestra el icono de ojo abierto, si es false, muestra el icono de ojo cerrado
                iconStyle={
                  showPassword ? { color: "#5F1AFF" } : { color: "#c2c2c2" }
                } // Si showPassword es true, muestra el icono de ojo cerrado en color gris, si es false, muestra el icono de ojo abierto en color rojo
                onPress={() => setShowPassword(!showPassword)} // Si showPassword es true, lo cambia a false, si es false, lo cambia a true
              />
            }
          />
          <Input
            placeholder="Repeat the password"
            keyboardType="password"
            autoCapitalize="none"
            secureTextEntry={showRepeatPassword}
            containerStyle={styles.input}
            onChange={(event) => changePayload(e, "repeatPassword")}
            errorMessage={error.repeatPassword}
            rightIcon={
              <Icon
                type="material-community"
                name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                iconStyle={
                  showPassword ? { color: "#5F1AFF" } : { color: "#c2c2c2" }
                }
                onPress={() => setShowRepeatPassword(!showRepeatPassword)}
              />
            }
          />
          <Button
            title="Create account"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={createUser}
          />
        </View>
      </View>
      <Loading show={loading} text="Creating account..." />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  input: {
    width: "100%",
    marginVertical: 10,
  },
  btnContainer: {
    marginBottom: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#5F1AFF",
  },
});
