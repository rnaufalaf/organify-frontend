import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import BuyerProfileStack from "../BuyerProfileStack";
import SellerProfileStack from "../SellerProfileStack";

const ProfileTab = createMaterialTopTabNavigator();

export default function ProfileTabNavigator() {
  const tabBarOptions = {
    activeTintColor: "white",
    inactiveTintColor: "black",
    indicatorStyle: { backgroundColor: "green", height: "100%" },
    pressOpacity: 1,
  };
  return (
    <ProfileTab.Navigator
      tabBarOptions={tabBarOptions}
      initialRouteName="Buyer"
    >
      <ProfileTab.Screen name="Buyer" component={BuyerProfileStack} />
      <ProfileTab.Screen name="Seller" component={SellerProfileStack} />
    </ProfileTab.Navigator>
  );
}
