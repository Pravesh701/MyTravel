import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { airportType } from '../types/travelSearchDataTypes';

export type HomeStackNavigatorParamList = {
    Home: undefined;
};
export type HomeScreenRouteProp = RouteProp<
    HomeStackNavigatorParamList,
    'Home'
>;
export type WalletStackNavigatorParamList = {
    Wallet: undefined;
};
export type WalletScreenRouteProp = RouteProp<
    WalletStackNavigatorParamList,
    'Wallet'
>;
export type BottomTabNavigatorParamList = {
    HomeStack: HomeStackNavigatorParamList;
    Wallet: WalletStackNavigatorParamList;
};
export type HomeScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<HomeStackNavigatorParamList, 'Home'>,
    BottomTabNavigationProp<BottomTabNavigatorParamList, 'Wallet'>
>;

export type RootNavigatorParamList = {
    Home: undefined;
    ExploreJourney: undefined;
    BottomTabs: undefined;
    Wallet: undefined;
    SearchResults: {
        source: airportType;
        destination: airportType;
    };
};

export type RootNavigationProp = NativeStackNavigationProp<RootNavigatorParamList>;
export type TopRouteProp = RouteProp<RootNavigatorParamList>;