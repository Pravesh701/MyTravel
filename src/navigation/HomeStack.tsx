import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Custom Imports
import Home from '../screens/home';
import { HomeStackNavigatorParamList } from './types';


const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        </HomeStack.Navigator>
    );
};

export default HomeStackNavigator;