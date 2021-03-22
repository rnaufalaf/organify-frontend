import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProductContainer from "../../screens/product//ProductContainer";
import ProductDetailScreen from "../../screens/product/ProductDetailScreen";

const Home = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Home.Navigator initialRouteName="Product Container">
      <Home.Screen
        name="Product Container"
        component={ProductContainer}
        options={{ headerShown: false }}
      />
      <Home.Screen
        name="Product Detail"
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
    </Home.Navigator>
  );
}
