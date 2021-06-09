import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import BuyerProfileScreen from "../../screens/profile/buyer/BuyerProfileScreen";

const BuyerProfile = createStackNavigator();

function getHeaderRoute(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? false;

  switch (routeName) {
    case "My Profiles":
      return true;
    case "Edit Buyer Profile":
      return false;
  }
}

export default function BuyerProfileStack({ navigation }) {
  return (
    <BuyerProfile.Navigator initialRouteName="Buyer Profile">
      <BuyerProfile.Screen
        name="Buyer Profile"
        component={BuyerProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </BuyerProfile.Navigator>
  );
}
