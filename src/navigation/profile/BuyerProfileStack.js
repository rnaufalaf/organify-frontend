import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import BuyerProfileScreen from '../../screens/profile/buyer/BuyerProfileScreen';

const BuyerProfile = createStackNavigator();

export default function BuyerProfileStack() {
  return (
    <BuyerProfile.Navigator initialRouteName="Buyer">
      <BuyerProfile.Screen name="Buyer" component={BuyerProfileScreen} />
    </BuyerProfile.Navigator>
  );
}
