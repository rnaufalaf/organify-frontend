import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CurrentOrderScreen from '../../screens/order/CurrentOrderScreen';

const CurrentOrder = createStackNavigator();

export default function CurrentOrderStack() {
  return (
    <CurrentOrder.Navigator initialRouteName="Current">
      <CurrentOrder.Screen name="Current" component={CurrentOrderScreen} />
    </CurrentOrder.Navigator>
  );
}
