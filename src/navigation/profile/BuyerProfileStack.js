import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import BuyerProfileScreen from "../../screens/profile/buyer/BuyerProfileScreen";
import EditBuyerProfileScreen from "../../screens/profile/buyer/EditBuyerProfileScreen";
import ListScreen from "../../screens/profile/buyer/ListScreen";

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
      <BuyerProfile.Screen
        name="Wishlist Screen"
        component={ListScreen}
        options={{
          headerShown: false,
        }}
      />
      <BuyerProfile.Screen
        name="Edit Buyer Profile"
        component={EditBuyerProfileScreen}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
          },
          headerStyle: {
            backgroundColor: "green",
          },
        }}
      />
    </BuyerProfile.Navigator>
  );
}
