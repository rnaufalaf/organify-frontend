import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileTabNavigator from "./ProfileTabNavigator";
import EditSellerProfileScreen from "../../../screens/profile/seller/EditSellerProfileScreen";
import SellerProductContainer from "../../../screens/profile/seller/SellerProductContainer";
import AddProductScreen from "../../../screens/profile/seller/AddProductScreen";
import EditSellerProductScreen from "../../../screens/profile/seller/EditSellerProductScreen";
import ImagePickerScreen from "../../../screens/profile/seller/ImagePickerScreen";
import OrderSellerStack from "../../order/OrderSellerStack";
import EditBuyerProfileScreen from "../../../screens/profile/buyer/EditBuyerProfileScreen";
import ListScreen from "../../../screens/profile/buyer/ListScreen";

const ProfileTabStack = createStackNavigator();

export default function ProfileTabStackNavigator({ navigation }) {
  return (
    <ProfileTabStack.Navigator>
      <ProfileTabStack.Screen
        name="My Profiles"
        component={ProfileTabNavigator}
        options={() => ({
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
          },
          headerStyle: {
            backgroundColor: "green",
          },
        })}
      />
      <ProfileTabStack.Screen
        name="Edit Seller Profile"
        component={EditSellerProfileScreen}
        options={{
          headerShown: true,
        }}
      />
      <ProfileTabStack.Screen
        name="Seller Order"
        component={OrderSellerStack}
        options={{ headerShown: true }}
      />
      <ProfileTabStack.Screen
        name="Seller Product List"
        component={SellerProductContainer}
        options={{
          headerShown: true,
        }}
      />
      <ProfileTabStack.Screen
        name="Edit Seller Product"
        component={EditSellerProductScreen}
        options={{
          headerShown: true,
        }}
      />
      <ProfileTabStack.Screen
        name="Add Product"
        component={AddProductScreen}
        options={{
          headerShown: true,
        }}
      />
      <ProfileTabStack.Screen
        name="Image Picker"
        component={ImagePickerScreen}
        options={{ headerRightContainerStyle: { paddingRight: 10 } }}
      />
      <ProfileTabStack.Screen
        name="Wishlist Screen"
        component={ListScreen}
        options={{
          headerShown: true,
        }}
      />
      <ProfileTabStack.Screen
        name="Edit Buyer Profile"
        component={EditBuyerProfileScreen}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
          },
          headerStyle: {
            backgroundColor: "green",
          },
        }}
      />
    </ProfileTabStack.Navigator>
  );
}
