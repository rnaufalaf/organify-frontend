import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";

import AuthNavigator from "./authentication/AuthNavigator";
import HomeTabNavigator from "./home/bottomtab/HomeTabNavigator";

import CartBadge from "../components/common/CartBadge";

const Main = createStackNavigator();

export default function MainNavigator({ navigation }) {
  return (
    <Main.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <Main.Screen
        name="Authentication"
        component={AuthNavigator}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Main.Screen
        name="HomeTab"
        component={HomeTabNavigator}
        options={({ navigation }) => ({
          headerTitle: "Organify",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
          },
          headerStyle: {
            backgroundColor: "green",
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("Cart")}
            >
              <Icon
                name="shopping-cart"
                style={{ color: "white", fontSize: 25 }}
              />
              <CartBadge />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("bell pressed");
              }}
            >
              <Icon
                name="bell-o"
                style={{ color: "white", fontSize: 25, marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Main.Navigator>
  );
}
