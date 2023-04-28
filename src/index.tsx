import React, { memo } from 'react'
import { SafeAreaProvider } from "react-native-safe-area-context";

//Custom Imports
import RootContainer from './navigation';
import NetworkIndicator from './components/NetworkIndicator';

type Props = {}

const Main = (props: Props) => {
  return (
    <SafeAreaProvider>
      <RootContainer />
      <NetworkIndicator />
    </SafeAreaProvider>
  )
}

export default memo(Main);