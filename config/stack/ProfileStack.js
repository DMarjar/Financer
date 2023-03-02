import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../modules/profile/adapters/screens/Profile";
import UserGuest from "../../modules/profile/adapters/screens/UserGuest";
import Login from "../../modules/auth/adapters/components/Login";
import CreateUser from "../../modules/user/CreateUser";
import UserLogged from './../../modules/user/UserLogged';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="profileStack" // Pantalla inicial
      screenOptions={{
        headerMode: "screen", // Muestra el header en cada pantalla
        headerTintColor: "white", // Color del texto del header
        headerStyle: { backgroundColor: "#BF0AFF" }, // Color del header
      }}
    >
      <Stack.Screen
        name="profileStack" // Nombre de la pantalla
        options={{ title: "Profile" }} // Titulo que se muestra en el header
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
      <Stack.Screen
        name="userLoggedStack"
        options={{ title: "Profile" }}
        component={UserLogged}
      />
    </Stack.Navigator>
  );
}
