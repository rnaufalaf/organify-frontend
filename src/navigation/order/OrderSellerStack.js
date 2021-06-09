import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OrderSellerScreen from "../../screens/order/OrderSellerScreen";
import OrderSellerDetailScreen from "../../screens/order/OrderSellerDetailScreen";
const Order = createStackNavigator();

export default function OrderStack({ navigation }) {
  return (
    <Order.Navigator initialRouteName="Order Seller">
      <Order.Screen
        name="Order Seller"
        component={OrderSellerScreen}
        options={{
          headerShown: false,
        }}
      />
      <Order.Screen
        name="Order Seller Detail"
        component={OrderSellerDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Order.Navigator>
  );
}
