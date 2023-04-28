import { StyleSheet, View, StatusBar } from 'react-native'
import React from 'react'

//Custom Imports
import Main from "./src/index";
import ErrorBoundary from './src/screens/errorBoundary'

type Props = {}

const App = (props: Props) => {
  return (
    <View style={styles.container}>
      <ErrorBoundary>
        <Main />
        <StatusBar />
      </ErrorBoundary>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})