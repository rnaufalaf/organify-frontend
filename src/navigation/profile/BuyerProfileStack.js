import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import BuyerProfileScreen from "../../screens/profile/buyer/BuyerProfileScreen";

const BuyerProfile = createStackNavigator();

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
