import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import ProfileStack from "../stack/ProfileStack";
import AboutStack from "../stack/AboutStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="profile" // Muestra por defecto el componente Profile
        screenOptions={({ route }) => ({
          // Opciones de los tabs (iconos, colores, etc)
          tabBarIcon: ({ color }) => screenOptions(route, color),
          tabBarActiveTintColor: "#BF0AFF",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="profile"
          options={{ title: "Perfil" }} // Titulo que se muestra en el tab
          component={ProfileStack} // Componente que se renderiza
        />
        <Tab.Screen
          name="about"
          options={{ title: "Acerca de" }} // Titulo que se muestra en el tab
          component={AboutStack} // Componente que se renderiza
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Switch para mostrar el icono correspondiente en cada tab
const screenOptions = (route, color) => {
  let iconName;
  switch (route.name) {
    case "profile":
      iconName = "account";
      break;
    case "about":
      iconName = "information";
      break;
  }
  return (
    <Icon
      type="material-community"
      name={iconName}
      size={22} // Tamaño del icono en pixeles
      color={color} // Color del icono
    />
  );
};
