import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileTabNavigator from "./ProfileTabNavigator";

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
    </ProfileTabStack.Navigator>
  );
}
