import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp, CompositeNavigationProp } from '@react-navigation/native';

export type HomeStackNavigatorParamList = {
    Home: undefined;
    ExploreJourney: undefined;
};

export type ExploreJourneyRouteProp = RouteProp<
    HomeStackNavigatorParamList,
    'ExploreJourney'
>;

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
};