import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CompletedOrderScreen from '../../screens/order/CompletedOrderScreen';

const CompletedOrder = createStackNavigator();

export default function CompletedOrderStack() {
  return (
    <CompletedOrder.Navigator initialRouteName="Completed">
      <CompletedOrder.Screen
        name="Completed"
        component={CompletedOrderScreen}
      />
    </CompletedOrder.Navigator>
  );
}
