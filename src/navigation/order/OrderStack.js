import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OrderScreen from "../../screens/order/OrderScreen";
import OrderDetailScreen from "../../screens/order/OrderDetailScreen";
const Order = createStackNavigator();

export default function OrderStack({ navigation }) {
  return (
    <Order.Navigator initialRouteName="Order">
      <Order.Screen
        name="Order"
        component={OrderScreen}
        options={{
          headerShown: false,
        }}
      />
      <Order.Screen
        name="Order Detail"
        component={OrderDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Order.Navigator>
  );
}
