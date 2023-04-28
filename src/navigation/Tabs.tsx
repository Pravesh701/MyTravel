import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Custom Imports
import Wallet from '../screens/wallet';
import HomeStackNavigator from './HomeStack';
import { BottomTabNavigatorParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;