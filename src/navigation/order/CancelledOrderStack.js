import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CancelledOrderScreen from '../../screens/order/CancelledOrderScreen';

const CancelledOrder = createStackNavigator();

export default function CancelledOrderStack() {
  return (
    <CancelledOrder.Navigator initialRouteName="Cancelled">
      <CancelledOrder.Screen
        name="Cancelled"
        component={CancelledOrderScreen}
      />
    </CancelledOrder.Navigator>
  );
}
