import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import Profile from "../../modules/profile/adapters/screens/Profile";
import About from "../../modules/about/adapters/screens/About";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="profile" // Muestra por defecto el componente Profile
        screenOptions={({ route }) => ({ // Opciones de los tabs (iconos, colores, etc)
          tabBarIcon: ({ color }) => screenOptions(route, color),
          tabBarActiveTintColor: "#BF0AFF",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="profile"
          options={{ title: "Perfil" }} // Titulo que se muestra en el tab
          component={Profile} // Componente que se renderiza
        />
        <Tab.Screen
          name="about"
          options={{ title: "Acerca de" }} // Titulo que se muestra en el tab
          component={About} // Componente que se renderiza
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

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
