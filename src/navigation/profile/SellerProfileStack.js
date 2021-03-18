import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SellerProfileScreen from '../../screens/profile/seller/SellerProfileScreen';

const SellerProfile = createStackNavigator();

export default function SellerProfileStack() {
  return (
    <SellerProfile.Navigator initialRouteName="Seller">
      <SellerProfile.Screen name="Seller" component={SellerProfileScreen} />
    </SellerProfile.Navigator>
  );
}
