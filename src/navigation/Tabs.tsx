import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Custom Imports
import Wallet from '../screens/wallet';
import color from '../constants/color';
import HomeStackNavigator from './HomeStack';
import HomeIcon from '../assets/svgs/HomeIcon';
import WalletIcon from '../assets/svgs/WalletIcon';
import { BottomTabNavigatorParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: color.inActive
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <HomeIcon color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          headerShown: false,
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color }) => (
            <WalletIcon color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;