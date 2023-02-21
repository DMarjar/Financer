import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from "../../modules/about/adapters/screens/About";

const Stack = createNativeStackNavigator();

export default function AboutStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen", // Muestra el header en cada pantalla
        headerTintColor: "white", // Color del texto del header
        headerStyle: { backgroundColor: "#BF0AFF" }, // Color del header
      }}
    >
      <Stack.Screen
        name="aboutStack" // Nombre de la pantalla
        options={{ title: "Acerca de nosotros" }} // Titulo que se muestra en el header
        component={About} // Componente que se renderiza
      />
    </Stack.Navigator>
  );
}
