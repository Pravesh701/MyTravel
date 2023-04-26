import { StyleSheet, Text, View } from 'react-native'
import React, {memo} from 'react'
import { SafeAreaProvider } from "react-native-safe-area-context";
import NetworkIndicator from './components/NetworkIndicator';

type Props = {}

const Main = (props: Props) => {
  return (
    <SafeAreaProvider>
        <NetworkIndicator />
    {/* <RootContainer /> */}
  </SafeAreaProvider>
  )
}

export default memo(Main);