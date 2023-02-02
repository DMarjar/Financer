import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../modules/profile/adapters/screens/Profile"
import UserGuest from "../../modules/profile/adapters/screens/UserGuest";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
    initialRouteName="userGuestStack"
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
        options={{ title: "Bienvenido" }}
        component={UserGuest} 
      />
    </Stack.Navigator>
  );
}
