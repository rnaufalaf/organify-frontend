import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ProductContainer from "../../screens/product//ProductContainer";
import ProductDetailScreen from "../../screens/product/ProductDetailScreen";
import CartScreen from "../../screens/cart/CartScreen";
import ChatNavigator from "../chat/ChatNavigator";
import StoreCatalogScreen from "../../screens/product/StoreCatalogScreen";

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
      <Home.Screen
        name="Store Catalog"
        component={StoreCatalogScreen}
        options={{ headerShown: false }}
      />
      <Home.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Home.Screen
        name="Chat"
        component={ChatNavigator}
        options={{ headerShown: false }}
      />
    </Home.Navigator>
  );
}
