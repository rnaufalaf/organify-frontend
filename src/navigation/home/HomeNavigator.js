import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../../screens/home/HomeScreen";

const Home = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Home.Navigator initialRouteName="Home">
      <Home.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Home.Navigator>
  );
}
