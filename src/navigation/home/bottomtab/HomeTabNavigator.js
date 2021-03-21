import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeNavigator from "../HomeNavigator";
import OrderNavigator from "../../order/toptab/OrderTabNavigator";
import ProfileNavigator from "../../profile/toptab/ProfileTabNavigator";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeTab = createMaterialBottomTabNavigator();

export default function HomeTabNavigator() {
  return (
    <HomeTab.Navigator
      initialRouteName="Home"
      activeColor="white"
      inactiveColor="white"
      barStyle={{ backgroundColor: "green" }}
    >
      <HomeTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: () => <Icon name="home" color="white" size={25} />,
          tabBarLabel: "Home",
        }}
      />
      <HomeTab.Screen
        name="Order"
        component={OrderNavigator}
        options={{
          tabBarIcon: () => (
            <Icon name="shopping-basket" color="white" size={21} />
          ),
          tabBarLabel: "Order",
        }}
      />
      <HomeTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: () => <Icon name="user" color="white" size={25} />,
          tabBarLabel: "Profile",
        }}
      />
    </HomeTab.Navigator>
  );
}
