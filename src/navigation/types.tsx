import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp, CompositeNavigationProp } from '@react-navigation/native';


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