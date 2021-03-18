import {OrganifyContext} from '../../context/OrganifyProvider';
import {AuthContext} from '../../context/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useState, useEffect} from 'react';
import LoginScreen from '../../screens/authentication/LoginScreen';
import RegisterScreen from '../../screens/authentication/RegisterScreen';
import SplashScreen from '../../screens/authentication/SplashScreen';

import jwtDecode from 'jwt-decode';

const Auth = createStackNavigator();

export default function AuthNavigator() {
  const organify = useContext(OrganifyContext);
  const {user, logout} = useContext(AuthContext);
  const [isLogin, setLogin] = useState(null);

  async function loginCheck() {
    if (await AsyncStorage.getItem('jwtToken')) {
      setLogin(await AsyncStorage.getItem('jwtToken'));
      organify.setUser(jwtDecode(await AsyncStorage.getItem('jwtToken')));
    } else {
      setLogin(null);
    }
  }

  useEffect(() => {
    loginCheck();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [isLogin, user, logout]);

  return (
    <>
      <Auth.Navigator
        screenOptions={{
          gestureEnabled: false,
        }}>
        <Auth.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: '',
          }}
        />
        <Auth.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: '',
          }}
        />
      </Auth.Navigator>
    </>
  );
}
