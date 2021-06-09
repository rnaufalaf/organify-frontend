import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import SellerProfileScreen from "../../screens/profile/seller/SellerProfileScreen";

const SellerProfile = createStackNavigator();

export default function SellerProfileStack() {
  return (
    <SellerProfile.Navigator initialRouteName="Seller Profile">
      <SellerProfile.Screen
        name="Seller Profile"
        component={SellerProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </SellerProfile.Navigator>
  );
}
