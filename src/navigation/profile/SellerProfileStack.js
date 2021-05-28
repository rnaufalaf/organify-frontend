import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import SellerProfileScreen from "../../screens/profile/seller/SellerProfileScreen";
import EditSellerProfileScreen from "../../screens/profile/seller/EditSellerProfileScreen";
import SellerProductContainer from "../../screens/profile/seller/SellerProductContainer";
import AddProductScreen from "../../screens/profile/seller/AddProductScreen";
import EditSellerProductScreen from "../../screens/profile/seller/EditSellerProductScreen";

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
      <SellerProfile.Screen
        name="Edit Seller Profile"
        component={EditSellerProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <SellerProfile.Screen
        name="Seller Product List"
        component={SellerProductContainer}
        options={{
          headerShown: false,
        }}
      />
      <SellerProfile.Screen
        name="Edit Seller Product"
        component={EditSellerProductScreen}
        options={{
          headerShown: false,
        }}
      />
      <SellerProfile.Screen
        name="Add Product"
        component={AddProductScreen}
        options={{
          headerShown: false,
        }}
      />
    </SellerProfile.Navigator>
  );
}
