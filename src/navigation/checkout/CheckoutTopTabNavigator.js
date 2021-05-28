import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import CheckoutScreen from "../../screens/checkout/CheckoutScreen";
import PaymentScreen from "../../screens/checkout/PaymentScreen";
import ConfirmScreen from "../../screens/checkout/ConfirmScreen";

const CheckoutTab = createMaterialTopTabNavigator();

export default function CheckoutTopTabNavigator() {
  const tabBarOptions = {
    activeTintColor: "white",
    inactiveTintColor: "black",
    indicatorStyle: { backgroundColor: "green", height: "100%" },
    pressOpacity: 1,
  };
  return (
    <CheckoutTab.Navigator
      initialRouteName="Shipping"
      tabBarOptions={tabBarOptions}
    >
      <CheckoutTab.Screen name="Shipping" component={CheckoutScreen} />
      <CheckoutTab.Screen name="Payment" component={PaymentScreen} />
      <CheckoutTab.Screen name="Confirm" component={ConfirmScreen} />
    </CheckoutTab.Navigator>
  );
}
