import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import BuyerProfileStack from '../BuyerProfileStack';
import SellerProfileStack from '../SellerProfileStack';

const ProfileTab = createMaterialTopTabNavigator();

export default function OrderTabNavigator() {
  return (
    <ProfileTab.Navigator initialRouteName="Current">
      <ProfileTab.Screen name="Buyer" component={BuyerProfileStack} />
      <ProfileTab.Screen name="Seller" component={SellerProfileStack} />
    </ProfileTab.Navigator>
  );
}
