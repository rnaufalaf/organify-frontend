import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';

import AuthNavigator from './authentication/AuthNavigator';
import HomeTabNavigator from './home/bottomtab/HomeTabNavigator';

const Main = createStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Main.Navigator
        initialRouteName="HomeTab"
        screenOptions={{
          gestureEnabled: false,
        }}>
        <Main.Screen
          name="Authentication"
          component={AuthNavigator}
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Main.Screen
          name="HomeTab"
          component={HomeTabNavigator}
          options={{
            headerTitle: 'Organify',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: 'green',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  console.log('cart pressed');
                }}>
                <Icon
                  name="shopping-cart"
                  style={{color: 'white', fontSize: 25, marginRight: 10}}
                />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  console.log('bell pressed');
                }}>
                <Icon
                  name="bell-o"
                  style={{color: 'white', fontSize: 25, marginLeft: 10}}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Main.Navigator>
    </NavigationContainer>
  );
}
