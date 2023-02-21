import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../modules/profile/adapters/screens/Profile";
import UserGuest from "../../modules/profile/adapters/screens/UserGuest";
import Login from "../../modules/profile/adapters/screens/Login";
import CreateUser from "../../modules/user/CreateUser";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="createUserStack" // Pantalla inicial
      screenOptions={{
        headerMode: "screen", // Muestra el header en cada pantalla
        headerTintColor: "white", // Color del texto del header
        headerStyle: { backgroundColor: "#BF0AFF" }, // Color del header
      }}
    >
      <Stack.Screen
        name="profileStack" // Nombre de la pantalla
        options={{ title: "Perfil" }} // Titulo que se muestra en el header
        component={Profile} // Componente que se renderiza
      />
      <Stack.Screen
        name="userGuestStack"
        options={{ title: "Welcome" }}
        component={UserGuest}
      />
      <Stack.Screen
        name="loginStack"
        options={{ title: "Login" }}
        component={Login}
      />
      <Stack.Screen
        name="createUserStack"
        options={{ title: "Create an account" }}
        component={CreateUser}
      />
    </Stack.Navigator>
  );
}
