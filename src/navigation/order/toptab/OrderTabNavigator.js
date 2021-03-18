import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import CurrentOrderStack from '../CurrentOrderStack';
import CompletedOrderStack from '../CompletedOrderStack';
import CancelledOrderStack from '../CancelledOrderStack';

const OrderTab = createMaterialTopTabNavigator();

export default function OrderTabNavigator() {
  return (
    <OrderTab.Navigator initialRouteName="Current">
      <OrderTab.Screen name="Current" component={CurrentOrderStack} />
      <OrderTab.Screen name="Completed" component={CompletedOrderStack} />
      <OrderTab.Screen name="Cancelled" component={CancelledOrderStack} />
    </OrderTab.Navigator>
  );
}
