import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeNavigator from '../HomeNavigator';
import OrderNavigator from '../../order/toptab/OrderTabNavigator';
import ProfileNavigator from '../../profile/toptab/ProfileTabNavigator';

const HomeTab = createMaterialBottomTabNavigator();

export default function HomeTabNavigator() {
  return (
    <HomeTab.Navigator initialRouteName="Home">
      <HomeTab.Screen name="Home" component={HomeNavigator} />
      <HomeTab.Screen name="Order" component={OrderNavigator} />
      <HomeTab.Screen name="Profile" component={ProfileNavigator} />
    </HomeTab.Navigator>
  );
}
