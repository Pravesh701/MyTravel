import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Custom Imports
import BottomTabs from './Tabs';
import ExploreJourney from '../screens/explore';
import { RootNavigatorParamList } from './types';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const RootNavigator = () => {
  const defaultOptions = {
    headerShown: false
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"BottomTabs"}>
        <Stack.Screen options={defaultOptions} name="BottomTabs" component={BottomTabs} />
        <Stack.Screen options={defaultOptions} name="ExploreJourney" component={ExploreJourney} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;