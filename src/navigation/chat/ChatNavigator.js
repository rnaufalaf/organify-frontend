import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MessageScreen from "../../screens/chat/MessageScreen";
import ChatScreen from "../../screens/chat/ChatScreen";

const ChatNavigator = createStackNavigator();

export default function SellerProfileStack() {
  return (
    <ChatNavigator.Navigator initialRouteName="Chat Screen">
      <ChatNavigator.Screen
        name="Chat Screen"
        component={ChatScreen}
        // options={({ route }) => ({
        //   title: route.params.userName,
        // })}
      />
      <ChatNavigator.Screen
        name="Message Screen"
        component={MessageScreen}
        // options={({route}) => ({
        //   title: route.params.user
        // })}
      />
    </ChatNavigator.Navigator>
  );
}
